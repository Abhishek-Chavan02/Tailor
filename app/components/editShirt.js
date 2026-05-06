"use client";
import { useState, useEffect } from 'react';
import Input from './input';
import Button from './button';

export default function EditShirt({ measurement, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        neck: '',
        shoulder: '',
        chest: '',
        stomach: '',
        sleeveLength: '',
        armhole: '',
        bicep: '',
        wrist: '',
        shirtLength: '',
        date: '',
        status: 'Pending'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (measurement) {
            setFormData({
                neck: measurement.neck || '',
                shoulder: measurement.shoulder || '',
                chest: measurement.chest || '',
                stomach: measurement.stomach || '',
                sleeveLength: measurement.sleeveLength || '',
                armhole: measurement.armhole || '',
                bicep: measurement.bicep || '',
                wrist: measurement.wrist || '',
                shirtLength: measurement.shirtLength || '',
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
            const response = await fetch('/api/shirt-measurements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update',
                    id: measurement._id,
                    ...formData
                })
            });

            const data = await response.json();

            if (data.success) {
                onSuccess && onSuccess();
                onClose && onClose();
            } else {
                setError(data.message || 'Failed to update shirt measurement');
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
                <h2 className="text-xl font-bold mb-6">Edit Shirt Measurement</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Neck (cm)</label>
                            <Input
                                type="number"
                                name="neck"
                                value={formData.neck}
                                onChange={handleChange}
                                placeholder="38"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Shoulder (cm)</label>
                            <Input
                                type="number"
                                name="shoulder"
                                value={formData.shoulder}
                                onChange={handleChange}
                                placeholder="45"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Chest (cm)</label>
                            <Input
                                type="number"
                                name="chest"
                                value={formData.chest}
                                onChange={handleChange}
                                placeholder="96"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Stomach (cm)</label>
                            <Input
                                type="number"
                                name="stomach"
                                value={formData.stomach}
                                onChange={handleChange}
                                placeholder="90"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Sleeve Length (cm)</label>
                            <Input
                                type="number"
                                name="sleeveLength"
                                value={formData.sleeveLength}
                                onChange={handleChange}
                                placeholder="62"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Armhole (cm)</label>
                            <Input
                                type="number"
                                name="armhole"
                                value={formData.armhole}
                                onChange={handleChange}
                                placeholder="48"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Bicep (cm)</label>
                            <Input
                                type="number"
                                name="bicep"
                                value={formData.bicep}
                                onChange={handleChange}
                                placeholder="32"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Wrist (cm)</label>
                            <Input
                                type="number"
                                name="wrist"
                                value={formData.wrist}
                                onChange={handleChange}
                                placeholder="18"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Shirt Length (cm)</label>
                            <Input
                                type="number"
                                name="shirtLength"
                                value={formData.shirtLength}
                                onChange={handleChange}
                                placeholder="75"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Measurement Date</label>
                            <Input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
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
