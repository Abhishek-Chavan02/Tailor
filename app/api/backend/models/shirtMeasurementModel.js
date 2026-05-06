import mongoose from 'mongoose';

const shirtMeasurementSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Inprogress', 'Done'],
        default: 'Pending'
    },
    // Shirt / Kurta (Upper Body) measurements
    neck: {
        type: Number,
        required: false
    },
    shoulder: {
        type: Number,
        required: false
    },
    chest: {
        type: Number,
        required: false
    },
    stomach: {
        type: Number,
        required: false
    },
    sleeveLength: {
        type: Number,
        required: false
    },
    armhole: {
        type: Number,
        required: false
    },
    bicep: {
        type: Number,
        required: false
    },
    wrist: {
        type: Number,
        required: false
    },
    shirtLength: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});

// Prevent OverwriteModelError in Next.js dev/hot-reload.
const ShirtMeasurement =
    mongoose.models.ShirtMeasurement ||
    mongoose.model('ShirtMeasurement', shirtMeasurementSchema);

export default ShirtMeasurement;
