import { NextResponse } from 'next/server';
import {
    createShirtMeasurementController,
    getAllShirtMeasurementsController,
    getShirtMeasurementsByStatusController,
    getShirtMeasurementsByCustomerIdController,
    deleteShirtMeasurementController,
    updateShirtMeasurementController,
    getShirtMeasurementsByDateController
} from "../backend/controllers/shirtMeasurementController";

export async function POST(request) {
    try {
        const body = await request.json();
        const { action } = body;

        switch (action) {
            case 'create':
                const createResult = await createShirtMeasurementController(body);
                if (createResult.success) {
                    return NextResponse.json(createResult, { status: 200 });
                } else {
                    return NextResponse.json(createResult, { status: 400 });
                }

            case 'getByStatus':
                const statusResult = await getShirtMeasurementsByStatusController(body);
                if (statusResult.success) {
                    return NextResponse.json(statusResult, { status: 200 });
                } else {
                    return NextResponse.json(statusResult, { status: 400 });
                }


            case 'getByCustomerId':
                const customerResult = await getShirtMeasurementsByCustomerIdController(body);
                if (customerResult.success) {
                    return NextResponse.json(customerResult, { status: 200 });
                } else {
                    return NextResponse.json(customerResult, { status: 400 });
                }
            case 'getShirtByDate':
                const dateResult = await getShirtMeasurementsByDateController();
                if (dateResult.success) {
                    return NextResponse.json(dateResult, { status: 200 });
                } else {
                    return NextResponse.json(dateResult, { status: 400 });
                }

            case 'update':
                const updateResult = await updateShirtMeasurementController(body);
                if (updateResult.success) {
                    return NextResponse.json(updateResult, { status: 200 });
                } else {
                    return NextResponse.json(updateResult, { status: 400 });
                }

            case 'delete':
                const deleteResult = await deleteShirtMeasurementController(body);
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

