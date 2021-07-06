const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        city: String,
        location: String,
        zip: String
    },
    e: {
        type: String,
        alias: 'email'
    },
    cd: {
        type: Date,
        alias: 'create_date'
    }
}, {strict: true, strictQuery: false});

userSchema.path('name').get(function(v) {
    return v + ' is my name';
});

userSchema.set('toJSON', { getters: true, virtuals: false });


//instance methods
userSchema.methods = {
    removeDot: function(name) {
        return name.replace('/./g','');
    }
}


//static methods
userSchema.static('findByName', function(name) {
    return this.find({name});
});

userSchema.statics.findById = function(_id) {
    return this.find({_id});
}

//query helpers
userSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i')});
}


//virtual method
userSchema.virtual('getCity')
.get(function() {
    return this.address.city;
})


//Collation query
// User.find({'address.city': 'San Jose'}).collation({ locale: 'en_US', strength: 1 }).then(users => {
//     console.log(users);
// })


module.exports = mongoose.model('User', userSchema);