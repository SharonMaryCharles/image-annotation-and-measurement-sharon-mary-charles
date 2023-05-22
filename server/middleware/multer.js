const multer = require('multer');

// Set the storage
var storage = multer.diskStorage
({
    destination : function ( req , file , cb )
    {
        cb(null, 'uploads')
    },
    filename : function (req, file , cb)
    {
        // image.jpg
        var ext = file.originalname.substring(file.originalname.lastIndexOf('.')); //substr

        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

module.exports = store = multer({ storage : storage })