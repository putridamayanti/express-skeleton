const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
    id: String,
    code: String,
    name: String,
    setting: Object
}, { timestamps: true })

exports.PaymentMethodModel = mongoose.model("PaymentMethod", PaymentMethodSchema)
