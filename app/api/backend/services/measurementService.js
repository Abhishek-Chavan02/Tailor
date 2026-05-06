const Measurement = require('../models/measurementModel');

const createMeasurement = async (measurementData) => {
    try {
        const measurement = new Measurement(measurementData);
        await measurement.save();
        return measurement;
    } catch (error) {
        throw new Error(`Error creating measurement: ${error.message}`);
    }
};

const getAllMeasurements = async (filters = {}) => {
    try {
        const measurements = await Measurement.find(filters)
            .populate('customerId', 'name lastName email phone')
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching measurements: ${error.message}`);
    }
};

const getMeasurementsByStatus = async (status) => {
    try {
        const measurements = await Measurement.find({ status })
            .populate('customerId', 'name lastName email phone')
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching measurements by status: ${error.message}`);
    }
};

const updateMeasurementStatus = async (id, status) => {
    try {
        const measurement = await Measurement.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate('customerId', 'name lastName email phone');
        
        if (!measurement) {
            throw new Error('Measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error updating measurement status: ${error.message}`);
    }
};

const deleteMeasurement = async (id) => {
    try {
        const measurement = await Measurement.findByIdAndDelete(id);
        
        if (!measurement) {
            throw new Error('Measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error deleting measurement: ${error.message}`);
    }
};

module.exports = {
    createMeasurement,
    getAllMeasurements,
    getMeasurementsByStatus,
    updateMeasurementStatus,
    deleteMeasurement
};
