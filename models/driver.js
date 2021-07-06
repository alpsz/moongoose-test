const mongoose = require('mongoose');
const { Schema } = mongoose;

const driverSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    license_number: {
        type: String,
        required: true
    },
    alt_number: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true
    },
    dl_state: {
        type: String,
        required: true,
    },
    total_load: {
        type:  String,
        required: true
    },
    total_miles: {
        type: String,
        required: true
    },
    total_revenue: {
        type: String,
        required: true
    }
}, {timeStamps: true});

module.exports = mongoose.model("Driver", driverSchema);