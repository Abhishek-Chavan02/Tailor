const {
    createMeasurement,
    getAllMeasurements,
    getMeasurementsByStatus,
    updateMeasurementStatus,
    deleteMeasurement
} = require('../services/measurementService');

export async function createMeasurementController(data) {
    try {
        const measurement = await createMeasurement(data);
        return { success: true, measurement };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function getAllMeasurementsController() {
    try {
        const measurements = await getAllMeasurements();
        return { success: true, measurements };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function getMeasurementsByStatusController(data) {
    try {
        const { status } = data;
        const measurements = await getMeasurementsByStatus(status);
        return { success: true, measurements };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function updateMeasurementStatusController(data) {
    try {
        const { id, status } = data;
        const measurement = await updateMeasurementStatus(id, status);
        return { success: true, measurement };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export async function deleteMeasurementController(data) {
    try {
        const { id } = data;
        const measurement = await deleteMeasurement(id);
        return { success: true, measurement };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
