"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import AddShirt from '../components/addShirt';
import EditShirt from '../components/editShirt';
import Button from '../components/button';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMeasurementsCustomerId } from "../redux/actions/measurementAction";

export default function Measurements() {
    const searchParams = useSearchParams();
    const customerId = searchParams.get('customerId');
    const [activeTab, setActiveTab] = useState('pending');
    const [isAddShirtModalOpen, setIsAddShirtModalOpen] = useState(false);
    const [isEditShirtModalOpen, setIsEditShirtModalOpen] = useState(false);
    const [editingMeasurement, setEditingMeasurement] = useState(null);
    const dispatch = useAppDispatch();
    const userMeasurementinfo = useAppSelector(
        (state) => state.customerMeasurement?.userMeasurementinfo
    );
    console.log("userMeasurementinfo", userMeasurementinfo);
    const tabs = [
        { id: 'Pending', label: 'Pending' },
        { id: 'Inprogress', label: 'Inprogress' },
        { id: 'Done', label: 'Done' }
    ];
    useEffect(() => {
        if (!customerId) return;
        dispatch(getMeasurementsCustomerId(customerId));
    }, [customerId, dispatch]);

    const addShirt = () => {
        setIsAddShirtModalOpen(true);
    };

    const handleCloseAddShirtModal = () => {
        setIsAddShirtModalOpen(false);
    };

    const handleAddShirtSuccess = () => {
        console.log("Shirt measurement added successfully");
    };

    const handleEditMeasurement = (measurement) => {
        setEditingMeasurement(measurement);
        setIsEditShirtModalOpen(true);
    };

    const handleCloseEditShirtModal = () => {
        setIsEditShirtModalOpen(false);
        setEditingMeasurement(null);
    };

    const handleEditShirtSuccess = () => {
        console.log("Shirt measurement updated successfully");
        // Refresh the measurements data
        if (customerId) {
            dispatch(getMeasurementsCustomerId(customerId));
        }
    };

    const handleDeleteMeasurement = async (measurement) => {
        if (window.confirm('Are you sure you want to delete this measurement?')) {
            try {
                const response = await fetch('/api/shirt-measurements', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'delete',
                        id: measurement._id
                    })
                });

                const data = await response.json();

                if (data.success) {
                    console.log("Measurement deleted successfully");
                    if (customerId) {
                        dispatch(getMeasurementsCustomerId(customerId));
                    }
                } else {
                    alert('Failed to delete measurement: ' + (data.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error deleting measurement:', error);
                alert('Network error. Please try again.');
            }
        }
    };

    const renderTabContent = () => {
        if (!userMeasurementinfo?.measurements) {
            return (
                <div className="p-6">
                    <p className="text-gray-600">Loading measurements...</p>
                </div>
            );
        }

        const filteredMeasurements = userMeasurementinfo.measurements.filter(
            measurement => measurement.status === activeTab
        );

        if (filteredMeasurements.length === 0) {
            return (
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        {activeTab} Measurements
                    </h3>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-gray-600">
                            No {activeTab.toLowerCase()} measurements at the moment.
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                    {activeTab} Measurements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    
                    {filteredMeasurements.map((measurement) => (
                        <div
                            key={measurement._id}
                            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-lg text-gray-800">
                                    Shirt Measurement
                                </h4>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        measurement.status === 'Pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : measurement.status === 'Inprogress'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-green-100 text-green-800'
                                    }`}
                                    >
                                        {measurement.status}
                                    </span>
                                    <div className="flex gap-2">
                                        <button 
                                            className="p-1 cursor-pointer hover:bg-gray-100 rounded"
                                            onClick={() => handleEditMeasurement(measurement)}
                                        >
                                            <Image 
                                                    src="/pen-to-square-solid-full.svg" 
                                                    alt="Edit" 
                                                    width={20} 
                                                    height={20} 
                                                />
                                        </button>
                                        <button 
                                            className="p-1 cursor-pointer hover:bg-red-100 rounded"
                                            onClick={() => handleDeleteMeasurement(measurement)}
                                        >
                                            <Image 
                                                    src="/trash-solid-full.svg" 
                                                    alt="Delete" 
                                                    width={20} 
                                                    height={20} 
                                                />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Expected Date:</span>
                                    <span className="text-sm text-gray-900 ml-2">
                                        {measurement.date ? new Date(measurement.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) : 'Not set'}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    Created: {new Date(measurement.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                </span>
                            </div>
                            <div className="space-y-2 mt-2">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-600">Neck:</span>
                                        <span className="text-gray-900">{measurement.neck}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Shoulder:</span>
                                        <span className="text-gray-900">{measurement.shoulder}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Chest:</span>
                                        <span className="text-gray-900">{measurement.chest}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Stomach:</span>
                                        <span className="text-gray-900">{measurement.stomach}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-600">Sleeve Length:</span>
                                        <span className="text-gray-900">{measurement.sleeveLength}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Armhole:</span>
                                        <span className="text-gray-900">{measurement.armhole}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Bicep:</span>
                                        <span className="text-gray-900">{measurement.bicep}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Wrist:</span>
                                        <span className="text-gray-900">{measurement.wrist}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-600">Shirt Length:</span>
                                        <span className="text-gray-900">{measurement.shirtLength}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Measurements</h1>

                <div className="flex gap-4 mb-4">
                    <div className="w-48">
                        <Button text="Add Shirt" onClick={() => {addShirt() }} />
                    </div>
                    <div className="w-48">
                        <Button text="Add Pant" onClick={() => { }} />
                    </div>
                </div>
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="bg-white rounded-lg shadow">
                    {renderTabContent()}
                </div>

                {(isAddShirtModalOpen || isEditShirtModalOpen) && (
                    <div>
                        {isAddShirtModalOpen && (
                            <AddShirt
                                customerId={customerId || "default_customer_id"} 
                                onClose={handleCloseAddShirtModal}
                                onSuccess={handleAddShirtSuccess}
                            />
                        )}
                        {isEditShirtModalOpen && (
                            <EditShirt
                                measurement={editingMeasurement}
                                onClose={handleCloseEditShirtModal}
                                onSuccess={handleEditShirtSuccess}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}