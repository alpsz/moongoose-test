const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 8000;
const faker = require('faker');
const User = require('./models/user');
const Load = require('./models/load');
const Driver = require('./models/driver');
const Company = require('./models/company');

const DATABASE_STRING = "";
mongoose.connect(DATABASE_STRING, {useNewUrlParser : true, useFindAndModify : true, useCreateIndex : true, useUnifiedTopology : true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to the database"));

db.once('open', async function () {
    console.log("connected to the database");
    const driverList = await Driver.find({}, '_id');
    const companyList = await Company.find({}, '_id');
    
    
    // for (let i = 0; i < 1000; i++) {
    //     let arr = [];
    //     for(let j = 0; j < 80; j++) {
    //         let add_arr = {};
    //         add_arr.location = faker.address.city();
    //         add_arr.state = faker.address.state();
    //         add_arr.zip = faker.address.zipCode();
    //         add_arr.country =  faker.address.county();
    //         arr.push(add_arr);
    //     }
    //     const company = new Company();
    //     company.contactName = faker.company.companyName();
    //     company.companyName = faker.company.companyName();
    //     company.email = faker.internet.email();
    //     company.phone = faker.phone.phoneNumber();
    //     company.mcNumber = faker.datatype.number();
    //     company.loadValidity = Math.floor(Math.random() * 50000);
    //     company.totalLoads =  Math.floor(Math.random() * 1000);
    //     company.remainingLoads = Math.floor(Math.random() * 1000);
    //     company.stripCustomerId = Math.floor(Math.random() * 1000);
    //     company.address = arr;
    //     company.save();
    // }
    let loadArr = [];
    for (let i = 0; i < 5000; i++) {
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
        let obj = {};
        // const load = new Load();
        obj.invoice = i;
        obj.company_id = companyList[Math.floor(Math.random() * 1000)];
        obj.company_name = faker.name.findName();
        obj.driver_id = driverList[Math.floor(Math.random() * 5000)];
        obj.total_miles = Math.floor(Math.random() * 5000);
        obj.total_time = Math.floor(Math.random() * 100000);
        obj.active_time = Math.floor(Math.random() * 50000);
        obj.load_status = "Active";
        obj.start_location = faker.address.city() +","+ faker.address.state();
        obj.end_location = faker.address.city() +","+ faker.address.state();
        obj.start_time = faker.date.recent();
        obj.end_time = faker.date.recent();
        obj.customer = faker.name.title();
        obj.notes = faker.random.words();
        obj.truck_number = faker.random.alphaNumeric();
        obj.trailer_number = faker.random.alphaNumeric();
        obj.rate = faker.finance.amount();
        obj.stops = faker.random.arrayElements();
        obj.location = arr;
        loadArr.push(obj);
        //load.save();
    }

    Load.insertMany(loadArr).then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });

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