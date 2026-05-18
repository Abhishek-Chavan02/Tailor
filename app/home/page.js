"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth";
import { getAllUsers, deleteUser } from "../redux/actions/userAction";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Input from "../components/input";
import Button from "../components/button";
import Image from "next/image";
import EditUser from "../components/EditUser";
import { updateUser } from "../redux/actions/userAction";
import Swal from "sweetalert2";

const PAGE_SIZE = 10;

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [canRender, setCanRender] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const { users: allUsers, pagination, loading: usersLoading } = useAppSelector(
    (state) => state.getAllUsers,
  );
  const { loading: updateLoading, updatedUser } = useAppSelector(
    (state) => state.updateUser,
  );

  const rows = allUsers ?? [];
  const listLength = rows.length;
  const total = pagination?.total ?? listLength;
  const totalPages = pagination?.totalPages ?? 0;
  const isAdmin = (user?.role || "").toLowerCase() === "admin";

  const fetchUsers = useCallback(() => {
    if (!user) return;
    if (isAdmin) {
      dispatch(
        getAllUsers({
          search: appliedSearch,
          page,
          limit: PAGE_SIZE,
        }),
      );
    } else {
      dispatch(getAllUsers());
    }
  }, [user, isAdmin, appliedSearch, page, dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useLayoutEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }
    setCanRender(true);
  }, [router]);

  useEffect(() => {
    if (!user) return;
    fetchUsers();
  }, [user, fetchUsers]);

  useEffect(() => {
    if (updatedUser && !updateLoading && user) {
      if (isAdmin) {
        dispatch(
          getAllUsers({
            search: appliedSearch,
            page,
            limit: PAGE_SIZE,
          }),
        );
      } else {
        dispatch(getAllUsers());
      }
    }
  }, [
    updatedUser,
    updateLoading,
    user,
    isAdmin,
    appliedSearch,
    page,
    dispatch,
  ]);

  const handleSearch = () => {
    setAppliedSearch(searchTerm.trim());
    setPage(1);
  };

  const resetHandle = () => {
    setSearchTerm("");
    setAppliedSearch("");
    setPage(1);
  };

  const handleEditClick = (u) => {
    setEditingUser(u);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (u) => {
    await Swal.fire({
      title: "Warning!",
      text: "You want really delete user",
      icon: "warning",
    });
    await dispatch(deleteUser(u._id));
    if (isAdmin) {
      const isLastOnPage = allUsers?.length === 1;
      if (isLastOnPage && page > 1) {
        setPage((p) => Math.max(1, p - 1));
      } else {
        await dispatch(
          getAllUsers({
            search: appliedSearch,
            page,
            limit: PAGE_SIZE,
          }),
        );
      }
    } else {
      await dispatch(getAllUsers());
    }
  };

  const handleAddMeasurement = (u) => {
    router.push(`/measurements?customerId=${u.id || u._id}`);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleUpdateUser = async (userId, userData) => {
    dispatch(updateUser({ id: userId, userData }));
    handleCloseEditModal();
    if (isAdmin) {
      await dispatch(
        getAllUsers({
          search: appliedSearch,
          page,
          limit: PAGE_SIZE,
        }),
      );
    } else {
      await dispatch(getAllUsers());
    }
  };

  if (!canRender || !user) return null;

  return (
    <>
      {isAdmin && (
        <div className="w-100 flex gap-2 ml-4">
          <div className="flex-6">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-2">
            <Button text="Search" onClick={handleSearch} />
          </div>
          <div className="flex-2">
            <Button text="Reset" onClick={resetHandle} />
          </div>
        </div>
      )}

      <div className="bg-slate-200 w-full flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-300">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            {isAdmin ? (
              <tbody>
                {rows.map((row) => (
                  <tr key={row._id} className="bg-slate-100 text-center">
                    <td>{row.name}</td>
                    <td>{row.lastName}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    <td>{row.role}</td>

                    <td className="flex gap-2 justify-center">
                      <button
                        type="button"
                        className="p-1 cursor-pointer"
                        onClick={() => handleEditClick(row)}
                      >
                        <Image
                          src="/pen-to-square-solid-full.svg"
                          alt="Edit"
                          width={20}
                          height={20}
                        />
                      </button>

                      <button
                        type="button"
                        className="p-1 cursor-pointer"
                        onClick={() => handleDeleteClick(row)}
                      >
                        <Image
                          src="/trash-solid-full.svg"
                          alt="Delete"
                          width={20}
                          height={20}
                        />
                      </button>

                      <button
                        type="button"
                        className="p-1 cursor-pointer"
                        onClick={() => handleAddMeasurement(row)}
                      >
                        <Image
                          src="/plus-solid-full.svg"
                          alt="Add"
                          width={20}
                          height={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {rows.map((item) =>
                  user?.email === item.email ? (
                    <tr key={item._id} className="bg-slate-100 text-center">
                      <td>{item.name}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>

                      <td className="flex gap-2 justify-center">
                        <button
                          type="button"
                          className="p-1 cursor-pointer"
                          onClick={() => handleEditClick(item)}
                        >
                          <Image
                            src="/pen-to-square-solid-full.svg"
                            alt="Edit"
                            width={20}
                            height={20}
                          />
                        </button>

                        <button
                          type="button"
                          className="p-1 cursor-pointer"
                          onClick={() => handleDeleteClick(item)}
                        >
                          <Image
                            src="/trash-solid-full.svg"
                            alt="Delete"
                            width={20}
                            height={20}
                          />
                        </button>

                        <button
                          type="button"
                          className="p-1 cursor-pointer"
                          onClick={() => handleAddMeasurement(item)}
                        >
                          <Image
                            src="/eye-solid-full.svg"
                            alt="View"
                            width={20}
                            height={20}
                          />
                        </button>
                      </td>
                    </tr>
                  ) : null,
                )}
              </tbody>
            )}
          </table>
        </div>

        {isAdmin && (total > 0 || usersLoading) ? (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-100 border-t border-slate-300 shrink-0">
            <p className="text-sm text-slate-700">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {(page - 1) * PAGE_SIZE + 1}
              </span>
              –
              <span className="font-semibold text-slate-900">
                {Math.min(page * PAGE_SIZE, total)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">{total}</span>
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous page"
                className="min-w-9 px-3 py-2 rounded-md text-lg font-medium bg-white text-slate-800 border border-slate-300 shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={page <= 1 || usersLoading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ‹
              </button>
              <span className="text-sm text-slate-600 tabular-nums">
                Page {page} of {Math.max(totalPages, 1)}
              </span>
              <button
                type="button"
                aria-label="Next page"
                className="min-w-9 px-3 py-2 rounded-md text-lg font-medium bg-white text-slate-800 border border-slate-300 shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={usersLoading || totalPages < 1 || page >= totalPages}
                onClick={() =>
                  setPage((p) => Math.min(totalPages || 1, p + 1))
                }
              >
                ›
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <EditUser
        user={editingUser}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUpdate={handleUpdateUser}
      />
    </>
  );
}
