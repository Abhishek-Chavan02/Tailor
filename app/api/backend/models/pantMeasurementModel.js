import mongoose from 'mongoose';

const pantMeasurementSchema = new mongoose.Schema({
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
    // Pant (Lower Body) measurements
    waist: {
        type: Number,
        required: false
    },
    hip: {
        type: Number,
        required: false
    },
    thigh: {
        type: Number,
        required: false
    },
    knee: {
        type: Number,
        required: false
    },
    bottom: {
        type: Number,
        required: false
    },
    inseam: {
        type: Number,
        required: false
    },
    outseam: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});

// Prevent OverwriteModelError in Next.js dev/hot-reload.
const PantMeasurement =
    mongoose.models.PantMeasurement ||
    mongoose.model('PantMeasurement', pantMeasurementSchema);

export default PantMeasurement;
