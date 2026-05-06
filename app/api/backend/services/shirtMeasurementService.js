import ShirtMeasurement from '../models/shirtMeasurementModel';
import { connectDB } from '../db/mongo';

const createShirtMeasurement = async (measurementData) => {
    try {
        await connectDB();
        const measurement = new ShirtMeasurement(measurementData);
        await measurement.save();
        return measurement;
    } catch (error) {
        throw new Error(`Error creating shirt measurement: ${error.message}`);
    }
};

const getAllShirtMeasurements = async (filters = {}) => {
    try {
        await connectDB();
        const measurements = await ShirtMeasurement.find(filters)
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching shirt measurements: ${error.message}`);
    }
};

const getShirtMeasurementsByStatus = async (status) => {
    try {
        await connectDB();
        const measurements = await ShirtMeasurement.find({ status })
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching shirt measurements by status: ${error.message}`);
    }
};

const updateShirtMeasurementStatus = async (id, status) => {
    try {
        await connectDB();
        const measurement = await ShirtMeasurement.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        
        if (!measurement) {
            throw new Error('Shirt measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error updating shirt measurement status: ${error.message}`);
    }
};

const deleteShirtMeasurement = async (id) => {
    try {
        await connectDB();
        const measurement = await ShirtMeasurement.findByIdAndDelete(id);
        
        if (!measurement) {
            throw new Error('Shirt measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error deleting shirt measurement: ${error.message}`);
    }
};

const getShirtMeasurementsByCustomerId = async (customerId) => {
    try {
        await connectDB();
        const measurements = await ShirtMeasurement.find({ customerId })
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching shirt measurements by customer ID: ${error.message}`);
    }
};

export {
    createShirtMeasurement,
    getAllShirtMeasurements,
    getShirtMeasurementsByStatus,
    updateShirtMeasurementStatus,
    deleteShirtMeasurement,
    getShirtMeasurementsByCustomerId
};
