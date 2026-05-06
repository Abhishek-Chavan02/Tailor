import {
    createShirtMeasurement,
    getAllShirtMeasurements,
    getShirtMeasurementsByStatus,
    getShirtMeasurementsByCustomerId,
    updateShirtMeasurementStatus,
    deleteShirtMeasurement
} from '../services/shirtMeasurementService';

export async function createShirtMeasurementController(data) {
    try {
        const measurement = await createShirtMeasurement(data);
        return { success: true, measurement };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function getAllShirtMeasurementsController() {
    try {
        const measurements = await getAllShirtMeasurements();
        return { success: true, measurements };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function getShirtMeasurementsByStatusController(data) {
    try {
        const { status } = data;
        const measurements = await getShirtMeasurementsByStatus(status);
        return { success: true, measurements };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function updateShirtMeasurementStatusController(data) {
    try {
        const { id, status } = data;
        const measurement = await updateShirtMeasurementStatus(id, status);
        return { success: true, measurement };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function getShirtMeasurementsByCustomerIdController(data) {
    try {
        const { customerId } = data;
        const measurements = await getShirtMeasurementsByCustomerId(customerId);
        return { success: true, measurements };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function deleteShirtMeasurementController(data) {
    try {
        const { id } = data;
        const measurement = await deleteShirtMeasurement(id);
        return { success: true, measurement };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
