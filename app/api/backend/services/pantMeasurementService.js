import PantMeasurement from '../models/pantMeasurementModel';
import { connectDB } from '../db/mongo';

const createPantMeasurement = async (measurementData) => {
    try {
        await connectDB();
        const measurement = new PantMeasurement(measurementData);
        await measurement.save();
        return measurement;
    } catch (error) {
        throw new Error(`Error creating pant measurement: ${error.message}`);
    }
};

const getAllPantMeasurements = async (filters = {}) => {
    try {
        await connectDB();
        const measurements = await PantMeasurement.find(filters)
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching pant measurements: ${error.message}`);
    }
};

const getPantMeasurementsByStatus = async (status) => {
    try {
        await connectDB();
        const measurements = await PantMeasurement.find({ status })
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching pant measurements by status: ${error.message}`);
    }
};

const updatePantMeasurementStatus = async (id, status) => {
    try {
        await connectDB();
        const measurement = await PantMeasurement.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        
        if (!measurement) {
            throw new Error('Pant measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error updating pant measurement status: ${error.message}`);
    }
};

const deletePantMeasurement = async (id) => {
    try {
        await connectDB();
        const measurement = await PantMeasurement.findByIdAndDelete(id);
        
        if (!measurement) {
            throw new Error('Pant measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error deleting pant measurement: ${error.message}`);
    }
};

const getPantMeasurementsByCustomerId = async (customerId) => {
    try {
        await connectDB();
        const measurements = await PantMeasurement.find({ customerId })
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching pant measurements by customer ID: ${error.message}`);
    }
};

export {
    createPantMeasurement,
    getAllPantMeasurements,
    getPantMeasurementsByStatus,
    updatePantMeasurementStatus,
    deletePantMeasurement,
    getPantMeasurementsByCustomerId
};
