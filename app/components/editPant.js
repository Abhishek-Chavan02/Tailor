"use client";
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import Input from './input';
import Button from './button';

export default function EditPant({ measurement, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        waist: '',
        hip: '',
        thigh: '',
        knee: '',
        bottom: '',
        length: '',
        date: '',
        status: 'Pending'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (measurement) {
            setFormData({
                waist: measurement.waist || '',
                hip: measurement.hip || '',
                thigh: measurement.thigh || '',
                knee: measurement.knee || '',
                bottom: measurement.bottom || '',
                length: measurement.length || '',
                date: measurement.date ? new Date(measurement.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                status: measurement.status || 'Pending'
            });
        }
    }, [measurement]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await api.post('/api/pant-measurements', {
                action: 'update',
                id: measurement._id,
                ...formData
            });

            if (data.success) {
                onSuccess && onSuccess();
                onClose && onClose();
            } else {
                setError(data.message || 'Failed to update pant measurement');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onClose && onClose();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-6">Edit Pant Measurement</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Waist (cm)</label>
                            <Input
                                type="number"
                                name="waist"
                                value={formData.waist}
                                onChange={handleChange}
                                placeholder="84"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Hip (cm)</label>
                            <Input
                                type="number"
                                name="hip"
                                value={formData.hip}
                                onChange={handleChange}
                                placeholder="98"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Thigh (cm)</label>
                            <Input
                                type="number"
                                name="thigh"
                                value={formData.thigh}
                                onChange={handleChange}
                                placeholder="56"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Knee (cm)</label>
                            <Input
                                type="number"
                                name="knee"
                                value={formData.knee}
                                onChange={handleChange}
                                placeholder="42"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Bottom (cm)</label>
                            <Input
                                type="number"
                                name="bottom"
                                value={formData.bottom}
                                onChange={handleChange}
                                placeholder="38"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Length (cm)</label>
                            <Input
                                type="number"
                                name="length"
                                value={formData.length}
                                onChange={handleChange}
                                placeholder="102"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Measurement Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Inprogress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button
                            type="submit"
                            text={loading ? 'Updating...' : 'Update Measurement'}
                            disabled={loading}
                            className="flex-1"
                        />
                        <Button
                            type="button"
                            text="Cancel"
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex-1 bg-gray-500 hover:bg-gray-600"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
