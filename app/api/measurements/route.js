import { NextResponse } from 'next/server';
import { requireAuth } from '../backend/middleware/authMiddleware';
import {
    createMeasurementController,
    getAllMeasurementsController,
    getMeasurementsByStatusController,
    updateMeasurementStatusController,
    deleteMeasurementController
} from '../backend/controllers/measurementController';

export async function POST(request) {
    try {
        requireAuth(request);
        const body = await request.json();
        const { action } = body;

        switch (action) {
            case 'create':
                const createResult = await createMeasurementController(body);
                if (createResult.success) {
                    return NextResponse.json(createResult, { status: 200 });
                } else {
                    return NextResponse.json(createResult, { status: 400 });
                }

            case 'getByStatus':
                const statusResult = await getMeasurementsByStatusController(body);
                if (statusResult.success) {
                    return NextResponse.json(statusResult, { status: 200 });
                } else {
                    return NextResponse.json(statusResult, { status: 400 });
                }

            case 'updateStatus':
                const updateResult = await updateMeasurementStatusController(body);
                if (updateResult.success) {
                    return NextResponse.json(updateResult, { status: 200 });
                } else {
                    return NextResponse.json(updateResult, { status: 400 });
                }

            case 'delete':
                const deleteResult = await deleteMeasurementController(body);
                if (deleteResult.success) {
                    return NextResponse.json(deleteResult, { status: 200 });
                } else {
                    return NextResponse.json(deleteResult, { status: 400 });
                }

            default:
                return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        requireAuth(request);
        const result = await getAllMeasurementsController();
        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
