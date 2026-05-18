import PantMeasurement from '../models/pantMeasurementModel';
import User from '../models/userModel';
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
            { new: true, runValidators: true }
        );
        
        if (!measurement) {
            throw new Error('Pant measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error updating pant measurement status: ${error.message}`);
    }
};

const getPantMeasurementsByDate = async () => {
    try {
        await connectDB();

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // 1️⃣ Get overdue records
        const overdue = await PantMeasurement.find({
            date: { $lt: currentDate },
            status: { $in: ['Pending', 'Inprogress'] }
        }).sort({ date: 1 });

        // 2️⃣ Get 2 nearest upcoming records
        const upcoming = await PantMeasurement.find({
            date: { $gte: currentDate },
        })
        .sort({ date: 1 })
        .limit(10);

        // 3️⃣ Merge results
        const result = [...overdue, ...upcoming];

        // 4️⃣ Attach customer info
        const uniqueCustomerIds = [
            ...new Set(
                result
                    .map((m) => m?.customerId)
                    .filter(Boolean)
                    .map((id) => String(id))
            )
        ];

        const users = await User.find(
            { _id: { $in: uniqueCustomerIds } },
            { name: 1, lastName: 1, email: 1, phone: 1 }
        ).lean();

        const userById = new Map(users.map((u) => [String(u._id), u]));

        return result.map((m) => ({
            ...m.toObject(),
            customer: userById.get(String(m.customerId)) || null
        }));

    } catch (error) {
        throw new Error(`Error fetching pant measurements: ${error.message}`);
    }
};

const updatePantMeasurement = async (id, updateData) => {
    try {
        await connectDB();
        const measurement = await PantMeasurement.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!measurement) {
            throw new Error('Pant measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error updating pant measurement: ${error.message}`);
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
    console.log('customerIddd: ', customerId);
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
    deletePantMeasurement,
    getPantMeasurementsByCustomerId,
    getPantMeasurementsByDate,
    updatePantMeasurementStatus,
    updatePantMeasurement,
};
