const mongoose = require('mongoose');
const {Schema} = mongoose;

const addressSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country : {
        type: String,
        required: true
    }
});

const companySchema = new Schema({
  
    contactName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: [addressSchema],
    mcNumber: {
        type: String,
        required: true
    },
    loadValidity: {
        type: String,
        required: true
    },
    totalLoads: {
        type: String,
        required: true
    },
    remainingLoads: {
        type: String,
        required: true
    },
    stripCustomerId: {
        type: String,
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model("Company", companySchema);