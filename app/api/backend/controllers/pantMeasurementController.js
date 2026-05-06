import {
    createPantMeasurement,
    getAllPantMeasurements,
    getPantMeasurementsByStatus,
    getPantMeasurementsByCustomerId,
    updatePantMeasurementStatus,
    deletePantMeasurement
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

export async function updatePantMeasurementStatusController(data) {
    try {
        const { id, status } = data;
        const measurement = await updatePantMeasurementStatus(id, status);
        return { success: true, measurement };
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
