import {
    createPantMeasurement,
    getAllPantMeasurements,
    getPantMeasurementsByStatus,
    getPantMeasurementsByCustomerId,
    updatePantMeasurement,
    deletePantMeasurement,
    getPantMeasurementsByDate
} from '../services/pantMeasurementService';

export async function createPantMeasurementController(data) {
    try {
        const measurement = await createPantMeasurement(data);
        return { success: true, measurement };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function getAllPantMeasurementsController() {
    try {
        const measurements = await getAllPantMeasurements();
        return { success: true, measurements };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function getPantMeasurementsByStatusController(data) {
    try {
        const { status } = data;
        const measurements = await getPantMeasurementsByStatus(status);
        return { success: true, measurements };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function updatePantMeasurementController(data) {
    try {
        const { id, ...updateData } = data;
        const measurement = await updatePantMeasurement(id, updateData);
        return { success: true, measurement };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function getPantMeasurementsByCustomerIdController(data) {
    try {
        const { customerId } = data;
        const measurements = await getPantMeasurementsByCustomerId(customerId);
        return { success: true, measurements };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function getPantMeasurementsByDateController() {
    try {
        const measurements = await getPantMeasurementsByDate();
        return { success: true, measurements };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function deletePantMeasurementController(data) {
    try {
        const { id } = data;
        const measurement = await deletePantMeasurement(id);
        return { success: true, measurement };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
