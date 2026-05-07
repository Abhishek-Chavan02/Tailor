"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { isLoggedIn } from '../utils/auth';
import { getAllUsers, deleteUser } from '../redux/actions/userAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Input from '../components/input';
import Button from '../components/button';
import Image from 'next/image';
import EditUser from '../components/EditUser';
import { updateUser } from '../redux/actions/userAction';

export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [canRender, setCanRender] = useState(false);
    const { users: allUsers } = useAppSelector((state) => state.getAllUsers);
    const { loading: updateLoading, updatedUser } = useAppSelector((state) => state.updateUser);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useLayoutEffect(() => {
        if (!isLoggedIn()) {
            router.replace('/login');
            return;
        }
        setCanRender(true);
    }, [router]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    useEffect(() => {
        if (updatedUser && !updateLoading) {
            dispatch(getAllUsers()); // Refresh the list after successful update
        }
    }, [updatedUser, updateLoading, dispatch]);

    const handleSearch = () => {
        dispatch(getAllUsers({ search: searchTerm }));
    }

    const resetHandle = () => {
        setSearchTerm("");
        dispatch(getAllUsers());
    }

    const handleEditClick = (user) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = async (user) => {
        await dispatch(deleteUser(user._id));
        await dispatch(getAllUsers());
    };
    
    const handleAddMeasurement = (user) => {
        router.push(`/measurements?customerId=${user._id}`);
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingUser(null);
    };

    const handleUpdateUser = async(userId, userData) => {
        dispatch(updateUser({ id: userId, userData })); 
        handleCloseEditModal(); 
       await dispatch(getAllUsers());
    };

    if (!canRender) return null;

    return (<>
        <div className="w-100 flex gap-2 ml-4">
            <div className="flex-6">
                <Input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex-2">
                <Button text="Search" onClick={handleSearch} />
            </div>
            <div className="flex-2">
                <Button text="Reset" onClick={resetHandle} />
            </div>
        </div>

        <div className="bg-slate-200 h-screen w-screen">
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
                <tbody>
                    {allUsers.map((user) => (
                        <tr key={user._id} className="bg-slate-100 text-center">
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            <td className="flex gap-2 justify-center">
                                <button className="p-1 cursor-pointer" onClick={() => handleEditClick(user)}>
                                    <Image src="/pen-to-square-solid-full.svg" alt="Edit" width={20} height={20} />
                                </button>
                                <button className="p-1 cursor-pointer" onClick={() => handleDeleteClick(user)}>
                                    <Image src="/trash-solid-full.svg" alt="Delete" width={20} height={20} />
                                </button>
                                 <button className="p-1 cursor-pointer" onClick={() => handleAddMeasurement(user)}>
                                    <Image src="/plus-solid-full.svg" alt="add" width={20} height={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <EditUser
            user={editingUser}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onUpdate={handleUpdateUser}
        />
    </>)
}


