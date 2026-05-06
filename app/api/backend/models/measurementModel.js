const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    // Shirt / Kurta (Upper Body)
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
    },
    // Pant (Lower Body)
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
const Measurement =
    mongoose.models.Measurement || mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
