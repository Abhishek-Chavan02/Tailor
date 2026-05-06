import ShirtMeasurement from '../models/shirtMeasurementModel';
import { connectDB } from '../db/mongo';
import { User } from '../models/userModel';

const createShirtMeasurement = async (measurementData) => {
    try {
        await connectDB();
        // Add current date if not provided
        const measurementDataWithDate = {
            ...measurementData,
            date: measurementData.date || new Date()
        };
        const measurement = new ShirtMeasurement(measurementDataWithDate);
        await measurement.save();
        return measurement;
    } catch (error) {
        throw new Error(`Error creating shirt measurement: ${error.message}`);
    }
};

const getAllShirtMeasurements = async (filters = {}) => {
    try {
        await connectDB();
        const measurements = await ShirtMeasurement.find(filters)
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching shirt measurements: ${error.message}`);
    }
};

const getShirtMeasurementsByStatus = async (status) => {
    try {
        await connectDB();
        const measurements = await ShirtMeasurement.find({ status })
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching shirt measurements by status: ${error.message}`);
    }
};


const deleteShirtMeasurement = async (id) => {
    try {
        await connectDB();
        const measurement = await ShirtMeasurement.findByIdAndDelete(id);
        
        if (!measurement) {
            throw new Error('Shirt measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error deleting shirt measurement: ${error.message}`);
    }
};

const getShirtMeasurementsByCustomerId = async (customerId) => {
    try {
        await connectDB();
        const measurements = await ShirtMeasurement.find({ customerId })
            .sort({ createdAt: -1 });
        return measurements;
    } catch (error) {
        throw new Error(`Error fetching shirt measurements by customer ID: ${error.message}`);
    }
};

const updateShirtMeasurement = async (id, updateData) => {
    try {
        await connectDB();
        const measurement = await ShirtMeasurement.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!measurement) {
            throw new Error('Shirt measurement not found');
        }
        
        return measurement;
    } catch (error) {
        throw new Error(`Error updating shirt measurement: ${error.message}`);
    }
};

const getShirtMeasurementsByDate = async () => {
    try {
        await connectDB();

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // 1️⃣ Get overdue records
        const overdue = await ShirtMeasurement.find({
            date: { $lt: currentDate },
            status: { $in: ['Pending', 'Inprogress'] }
        }).sort({ date: 1 });

        // 2️⃣ Get 2 nearest upcoming records
        const upcoming = await ShirtMeasurement.find({
            date: { $gte: currentDate },
            status: { $in: ['Pending', 'Inprogress'] }
        })
        .sort({ date: 1 })
        .limit(2);

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
        throw new Error(`Error fetching shirt measurements: ${error.message}`);
    }
};

export {
    createShirtMeasurement,
    getAllShirtMeasurements,
    getShirtMeasurementsByStatus,
    deleteShirtMeasurement,
    getShirtMeasurementsByCustomerId,
    updateShirtMeasurement,
    getShirtMeasurementsByDate
};
