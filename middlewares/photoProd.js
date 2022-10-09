const Aws = require('aws-sdk')                // aws-sdk library will used to upload image to s3 bucket.
require("dotenv/config")                      // for using the environment variables that stores the confedential information.

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
})


const uploadPhoto = async (req, res, next) => {

    try {        

        if (req.body.updatePhoto == 'false') {
            console.log("no existe file de imagen para update")
            req.body.Location = ''
            next();
        } else {
            console.log("existe imagen file y se subira a S3")
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
                Key: req.file.originalname,               // Name of the image
                Body: req.file.buffer,                    // Body which will contain the image in buffer format
                ContentType: "image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
            };


            s3.upload(params).promise()
                .then((resp) => {
                    console.log("mid= url desde s3:", resp.Location)
                    req.body.Location = resp.Location
                    next()

                })
                .catch((error) => {
                    console.log("error al obtener url desde aws", error)
                    req.body.Location = "error al subir imagen a aws"
                    next()
                })

        }
    } catch (error) {
        console.log(error)

        next()
    }




}


module.exports = {
    uploadPhoto
};












