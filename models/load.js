const mongoose = require('mongoose');
const {Schema} = mongoose;

const locationSchema = new Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
    speed: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const loadSchema = new Schema({
    invoice: {
        type: String,
        required: true
    },
    company_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    driver_id: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    total_miles: {
        type: Number,
        required: true
    },
    total_time: {
        type: Number,
        required: true
    },
    active_time: {
        type: Number,
        required: true
    },
    load_status: {
        type: String,
        required: true
    },
    location: [ locationSchema ],
    start_location: {
        type: String,
        required: true
    },
    end_location: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    truck_number: {
        type: String,
        required: true
    },
    trailer_number: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    stops: [] 
}, {timestamps: true});


module.exports = mongoose.model("Load", loadSchema);