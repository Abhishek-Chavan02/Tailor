import mongoose from 'mongoose';

const pantMeasurementSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    waist: {
        type: Number,
        required: true
    },
    hip: {
        type: Number,
        required: true
    },
    thigh: {
        type: Number,
        required: true
    },
    knee: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    bottom: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Inprogress', 'Done'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

pantMeasurementSchema.pre('save', function() {
    this.updatedAt = new Date();
});

// Prevent OverwriteModelError in Next.js dev/hot-reload.
const PantMeasurement =
    mongoose.models.PantMeasurement ||
    mongoose.model('PantMeasurement', pantMeasurementSchema);

export default PantMeasurement;
