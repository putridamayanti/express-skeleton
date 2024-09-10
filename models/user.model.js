const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    roleId: String
}, { timestamps: true })

exports.UserModel = mongoose.model("User", UserSchema)