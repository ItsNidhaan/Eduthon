const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let SALT = 10;


const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: 1,
        trim: true
     },
    password: { 
        type: String,
        required: true,
        minlength:6
     }
     
});
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function(candidatePassword, checkpassword){
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch){
        if(err) return checkpassword(err)
        checkpassword(null, isMatch)
    })
}
const User = mongoose.model('User',userSchema);
module.exports = { User }