const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    brand:{
        type:String,
        required:true
    },
    origin:{
        type: String,
        required: true
    },
    sale:{
        type: Number,
        require: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    sold:{
        type: Number,
        default: 0
    },
    currentPrice:{
        type: Number,
        trim: true
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Products", productSchema)