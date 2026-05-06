import { NextResponse } from 'next/server';
import {
    createShirtMeasurementController,
    getAllShirtMeasurementsController,
    getShirtMeasurementsByStatusController,
    getShirtMeasurementsByCustomerIdController,
    updateShirtMeasurementStatusController,
    deleteShirtMeasurementController
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

            case 'updateStatus':
                const updateResult = await updateShirtMeasurementStatusController(body);
                if (updateResult.success) {
                    return NextResponse.json(updateResult, { status: 200 });
                } else {
                    return NextResponse.json(updateResult, { status: 400 });
                }

            case 'getByCustomerId':
                // Use the controller so we get the standard { success, measurements } shape
                const customerResult = await getShirtMeasurementsByCustomerIdController(body);
                if (customerResult.success) {
                    return NextResponse.json(customerResult, { status: 200 });
                } else {
                    return NextResponse.json(customerResult, { status: 400 });
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

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const customerId = searchParams.get('customerId');
        
        if (customerId) {
            // Get measurements by customer ID
            const result = await getShirtMeasurementsByCustomerIdController({ customerId });
            if (result.success) {
                return NextResponse.json(result, { status: 200 });
            } else {
                return NextResponse.json(result, { status: 400 });
            }
        } else {
            // Get all measurements
            const result = await getAllShirtMeasurementsController();
            if (result.success) {
                return NextResponse.json(result, { status: 200 });
            } else {
                return NextResponse.json(result, { status: 400 });
            }
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
