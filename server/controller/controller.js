const UploadModel = require('../model/schema');
const fs = require('fs');

exports.home =  async (req, res) => 
{
    //const all_images = await UploadModel.find();
    res.render('main'); //{images: all_images}
}

exports.uploads = (req, res, next) =>
{
    const files = req.files;

    if(!files)
    {
        const error = new Error('EError: Please Choose Files');
        error.httpStatusCode = 400;

        return next(error)
    }

    let imgArray = files.map((file) => 
    {
        let img = fs.readFileSync(file.path);

        return encode_image = img.toString('base64');
    })

    let result = imgArray.map((src, index) => 
    {
        // create object to store data in the collection
        let finalImg = 
        {
            filename : files[index].originalname,
            contentType : files[index].mimetype,
            imageBase64 : src
        }

        let newUpload = new UploadModel(finalImg);

        return newUpload.save().then(() => 
        {
            return { msg : `${files[index].originalname} Uploaded Successfully...!`}
        })
        .catch(error =>
        {
            if(error)
            {
                if(error.name === 'MongoError' && error.code === 11000)
                {
                    return Promise.reject({ error : `Duplicate ${files[index].originalname}. File Already exists! `});
                }
                
                return Promise.reject({ error : error.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
            }
        })
    });    

    Promise.all(result).then( msg => 
    {
        //res.json(msg);
        res.redirect('/nextPage'); // /
    })
    .catch(err =>
    {
        res.json(err);
    })
}

exports.nextPage =  async (req, res) => 
{
    const all_images = await UploadModel.find();
    res.render('main', {images: all_images}); //, {images: all_images}
}

//-------
exports.getImage = async (req, res) => 
{
    const imageId = req.params.id;
    const image = await UploadModel.findById(imageId);
    
    res.render('layouts/main2', { layout: 'layouts/main2', contentType: image.contentType,  imageBase64: image.imageBase64}); //'main', { contentType: image.contentType,  imageBase64: image.imageBase64}
};