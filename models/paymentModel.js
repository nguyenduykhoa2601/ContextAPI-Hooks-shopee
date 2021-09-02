const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    enabletime:{
        type: String,
        required: true
    },
    requirement:{
        type:String,
        required: false
    },
    cart:{
        type: Array,
        default: []
    },
    confirm:{
        type: Boolean,
        default: false
    },
    status:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Payments", paymentSchema)