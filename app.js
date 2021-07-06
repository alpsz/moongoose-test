const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 8000;
const faker = require('faker');
const User = require('./models/user');
const Load = require('./models/load');
const Driver = require('./models/driver');


const DATABASE_STRING = "mongodb+srv://windson:7WUUxJojmKHEKu5d@cluster0.xlwja.mongodb.net/windsonTrack";
mongoose.connect(DATABASE_STRING, {useNewUrlParser : true, useFindAndModify : true, useCreateIndex : true, useUnifiedTopology : true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to the database"));

db.once('open', async function () {
    console.log("connected to the database");
    const driverList = await Driver.find({}, '_id');
    
    let loadArr = [];
    for (let i = 0; i < 1; i++) {
        let arr = [];
        for(let j = 0; j < 80; j++) {
            let loc_arr = {};
            loc_arr.latitude = faker.address.latitude();
            loc_arr.longitude = faker.address.longitude();
            loc_arr.direction = faker.address.direction();
            loc_arr.speed =  Math.floor(Math.random() * 100);
            loc_arr.time =  faker.time.recent();
            arr.push(loc_arr);
        }

        const load = new Load();
        load.invoice = i;
        load.company_id = Math.floor(Math.random() * 1000);
        load.company_name = faker.name.findName();
        load.driver_id = driverList[Math.floor(Math.random() * 5000)];
        load.total_miles = Math.floor(Math.random() * 5000);
        load.total_time = Math.floor(Math.random() * 100000);
        load.active_time = Math.floor(Math.random() * 50000);
        load.load_status = "Active";
        load.start_location = faker.address.city() + faker.address.state();
        load.end_location = faker.address.city() + faker.address.state();
        load.start_time = faker.date.recent();
        load.end_time = faker.date.recent();
        load.customer = faker.name.title();
        load.notes = faker.random.words();
        load.truck_number = faker.random.alphaNumeric();
        load.trailer_number = faker.random.alphaNumeric();
        load.rate = faker.finance.amount();
        load.stops = faker.random.arrayElements();
        load.location = arr;
        //load.save();
    }

    // for (let i = 0; i < 1000; i++) {
    //     const driver = new Driver();
    //     driver.name = faker.name.findName();
    //     driver.phone = faker.phone.phoneNumber();
    //     driver.license_number = faker.random.alphaNumeric();
    //     driver.alt_number = faker.phone.phoneNumber();
    //     driver.dob = faker.date.past();
    //     driver.dl_state = faker.address.state();
    //     driver.total_load = Math.floor(Math.random() * 10000);
    //     driver.total_miles = Math.floor(Math.random() * 100000);
    //     driver.total_revenue = Math.floor(Math.random() * 100000);
    //     driver.save();
    // }

    
    

});



app.listen(port, function(err) {
    if(err) {
        console.log('Error', err);
    }
    console.log('server is running');
})