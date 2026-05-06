import { NextResponse } from 'next/server';
import {
    createPantMeasurementController,
    getAllPantMeasurementsController,
    getPantMeasurementsByStatusController,
    getPantMeasurementsByCustomerIdController,
    updatePantMeasurementStatusController,
    deletePantMeasurementController
} from '../backend/controllers/pantMeasurementController';

export async function POST(request) {
    try {
        const body = await request.json();
        const { action } = body;

        switch (action) {
            case 'create':
                const createResult = await createPantMeasurementController(body);
                if (createResult.success) {
                    return NextResponse.json(createResult, { status: 200 });
                } else {
                    return NextResponse.json(createResult, { status: 400 });
                }

            case 'getByStatus':
                const statusResult = await getPantMeasurementsByStatusController(body);
                if (statusResult.success) {
                    return NextResponse.json(statusResult, { status: 200 });
                } else {
                    return NextResponse.json(statusResult, { status: 400 });
                }

            case 'updateStatus':
                const updateResult = await updatePantMeasurementStatusController(body);
                if (updateResult.success) {
                    return NextResponse.json(updateResult, { status: 200 });
                } else {
                    return NextResponse.json(updateResult, { status: 400 });
                }

            case 'getByCustomerId':
                const customerResult = await getPantMeasurementsByCustomerIdController(body);
                if (customerResult.success) {
                    return NextResponse.json(customerResult, { status: 200 });
                } else {
                    return NextResponse.json(customerResult, { status: 400 });
                }

            case 'delete':
                const deleteResult = await deletePantMeasurementController(body);
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

export async function GET() {
    try {
        const result = await getAllPantMeasurementsController();
        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
