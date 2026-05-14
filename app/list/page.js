'use client'
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getMeasurementsByDate } from "../redux/actions/measurementAction";
import Image from 'next/image';

export default function List() {
    const dispatch = useAppDispatch();
    const measurementsByDate = useAppSelector((state) => state.customerMeasurement.measurementsByDate);
    const [activeTab, setActiveTab] = useState('pending');
    
    
    useEffect(() => {
        dispatch(getMeasurementsByDate());
    }, []);

    // Debug: Log the measurements data
    console.log('Measurements data:', measurementsByDate);
    console.log('Filtered measurements for tab:', activeTab, filterMeasurements(measurementsByDate?.measurements, activeTab));

    // Filter measurements based on tab
 const filterMeasurements = (measurements, tab) => {
    if (!measurements) return [];

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    switch (tab) {

        case 'pending':
            return measurements.filter(m => {
                const measurementDate = new Date(m.date);
                measurementDate.setHours(0, 0, 0, 0);

                // Pending but NOT delayed
                return (
                    m.status === 'Pending' &&
                    measurementDate >= currentDate
                );
            });

        case 'inprogress':
            return measurements.filter(m => {
                const measurementDate = new Date(m.date);
                measurementDate.setHours(0, 0, 0, 0);

                // Inprogress but NOT delayed
                return (
                    m.status === 'Inprogress' &&
                    measurementDate >= currentDate
                );
            });

        case 'done':
            return measurements.filter(m => m.status === 'Done');

        case 'delayed':
            return measurements.filter(m => {
                const measurementDate = new Date(m.date);
                measurementDate.setHours(0, 0, 0, 0);

                return (
                    measurementDate < currentDate &&
                    (m.status === 'Pending' || m.status === 'Inprogress')
                );
            });

        case 'all':
        default:
            return measurements;
    }
};
    const filteredMeasurements = filterMeasurements(measurementsByDate?.measurements, activeTab);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">Measurement List</h1>
            
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            activeTab === 'inprogress' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('inprogress')}
                    >
                        In Progress
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            activeTab === 'done' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('done')}
                    >
                        Done
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            activeTab === 'delayed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('delayed')}
                    >
                        Delayed
                    </button>
                </div>
            </div>

            {filteredMeasurements ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Customer:</span>
                                    <span className="text-sm text-gray-900 ml-2">
                                        {measurement.customer?.name} {measurement.customer?.lastName}
                                    </span>
                                </div>
                         
                            </div>
                            
                            <div className="mb-2">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Email:</span>
                                        <span className="text-sm text-gray-900 ml-2">
                                            {measurement.customer?.email}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Phone:</span>
                                        <span className="text-sm text-gray-900 ml-2">
                                            {measurement.customer?.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Expected Date:</span>
                                    <span className="text-sm text-gray-900 ml-2">
                                        {new Date(measurement.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Created Date:</span>
                                    <span className="text-sm text-gray-900 ml-2">
                                        {new Date(measurement.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                    </span>
                                </div>
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
            ) : (
                <div className="p-6">
                    <p className="text-gray-600">Loading measurements...</p>
                </div>
            )}
        </div>
    );
}