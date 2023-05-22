const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema
({
    //declare attributes of the image
    filename : {
        type : String,
        unique : true,
        required: true
    },
    contentType : {
        type: String,
        required : true
    },
    imageBase64 : {
        type : String,
        required: true
    }
})

module.exports = UploadModel = mongoose.model('uploads', uploadSchema);