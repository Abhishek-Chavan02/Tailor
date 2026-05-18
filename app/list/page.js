"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMeasurementList } from "../redux/actions/measurementAction";

const PAGE_SIZE = 12;

export default function List() {
  const dispatch = useAppDispatch();
  const measurementList = useAppSelector(
    (state) => state.customerMeasurement.measurementList,
  );
  const measurementListLoading = useAppSelector(
    (state) => state.customerMeasurement.measurementListLoading,
  );
  const measurementListError = useAppSelector(
    (state) => state.customerMeasurement.measurementListError,
  );

  const [activeTab, setActiveTab] = useState("pending");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    dispatch(
      getMeasurementList({ tab: activeTab, page, limit: PAGE_SIZE }),
    );
  }, [dispatch, activeTab, page]);

  /** Calendar-day comparison: same as delayed filter; avoids "Delayed" on the due date. */
  const getDisplayStatus = (m) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expected = new Date(m.date);
    expected.setHours(0, 0, 0, 0);
    const pastDue =
      expected < today &&
      (m.status === "Pending" || m.status === "Inprogress");
    return pastDue ? "Delayed" : m.status;
  };

  const rows = measurementList?.measurements ?? [];
  const pagination = measurementList?.pagination;
  const totalPages = pagination?.totalPages ?? 0;
  const total = pagination?.total ?? 0;

  const initialLoad = !measurementList && measurementListLoading;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Measurement List</h1>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "inprogress"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("inprogress")}
          >
            In Progress
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "done"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("done")}
          >
            Done
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === "delayed"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("delayed")}
          >
            Delayed
          </button>
        </div>
      </div>

      {measurementListError ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {measurementListError}
        </div>
      ) : null}

      {initialLoad ? (
        <div className="p-6">
          <p className="text-gray-600">Loading measurements...</p>
        </div>
      ) : rows.length === 0 ? (
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="text-gray-600">
            No measurements match this filter.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rows.map((measurement) => (
              <div
                key={`${String(measurement._id)}-${measurement._garmentType || "row"}`}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg text-gray-800">
                    {measurement._garmentType === "shirt"
                      ? "Shirt Measurement"
                      : "Pant Measurement"}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        getDisplayStatus(measurement) === "Delayed"
                          ? "bg-red-100 text-red-800"
                          : measurement.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : measurement.status === "Inprogress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {getDisplayStatus(measurement)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Customer:
                    </span>
                    <span className="text-sm text-gray-900 ml-2">
                      {measurement.customer?.name}{" "}
                      {measurement.customer?.lastName}
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Email:
                      </span>
                      <span className="text-sm text-gray-900 ml-2">
                        {measurement.customer?.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Phone:
                      </span>
                      <span className="text-sm text-gray-900 ml-2">
                        {measurement.customer?.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Expected Date:
                    </span>
                    <span className="text-sm text-gray-900 ml-2">
                      {new Date(measurement.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Created Date:
                    </span>
                    <span className="text-sm text-gray-900 ml-2">
                      {new Date(measurement.createdAt).toLocaleDateString(
                        "en-GB",
                        { day: "2-digit", month: "2-digit", year: "2-digit" },
                      )}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  {measurement._garmentType === "shirt" ? (
                    <>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">
                            Neck:
                          </span>
                          <span className="text-gray-900">
                            {measurement.neck}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Shoulder:
                          </span>
                          <span className="text-gray-900">
                            {measurement.shoulder}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Chest:
                          </span>
                          <span className="text-gray-900">
                            {measurement.chest}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Stomach:
                          </span>
                          <span className="text-gray-900">
                            {measurement.stomach}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">
                            Sleeve Length:
                          </span>
                          <span className="text-gray-900">
                            {measurement.sleeveLength}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Armhole:
                          </span>
                          <span className="text-gray-900">
                            {measurement.armhole}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Bicep:
                          </span>
                          <span className="text-gray-900">
                            {measurement.bicep}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Wrist:
                          </span>
                          <span className="text-gray-900">
                            {measurement.wrist}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">
                            Shirt Length:
                          </span>
                          <span className="text-gray-900">
                            {measurement.shirtLength}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">
                            Waist:
                          </span>
                          <span className="text-gray-900">
                            {measurement.waist}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Hip:
                          </span>
                          <span className="text-gray-900">
                            {measurement.hip}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Thigh:
                          </span>
                          <span className="text-gray-900">
                            {measurement.thigh}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Knee:
                          </span>
                          <span className="text-gray-900">
                            {measurement.knee}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">
                            Bottom:
                          </span>
                          <span className="text-gray-900">
                            {measurement.bottom}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">
                            Length:
                          </span>
                          <span className="text-gray-900">
                            {measurement.length}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {total > 0 && totalPages > 0 ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-white rounded-lg shadow px-4 py-3 border border-gray-200">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {(page - 1) * PAGE_SIZE + 1}
                </span>
                –
                <span className="font-medium text-gray-900">
                  {Math.min(page * PAGE_SIZE, total)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900">{total}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={page <= 1 || measurementListLoading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    page >= totalPages || measurementListLoading
                  }
                  onClick={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
