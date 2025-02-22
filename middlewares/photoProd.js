const Aws = require('aws-sdk')                // aws-sdk library will used to upload image to s3 bucket.
require("dotenv/config")                      // for using the environment variables that stores the confedential information.

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
})


const deletePhoto = async (req, res, next) => {

    const photoKey = req.params.name

    s3.deleteObject({ Key: photoKey, Bucket: process.env.AWS_BUCKET_NAME }, (err, data) => {

        console.log("la data al borrar desde aws s3 es: ", data)

        if (err) {
            // return alert("There was an error deleting your photo: ", err.message);
            console.log("error al borrar en aws s3", err)
        }
        // alert("Successfully deleted photo.");

        next()

    })
}


const uploadPhoto = (req, res, next) => {

    try {
        
        if (req.body.updatePhoto == 'false' || req.body.updatePhoto === false) {
            console.log("req.body.updatePhoto == 'false', (no existe file de imagen para update)")
            req.body.Location = ''
            next();
        } else {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
                Key: req.file.originalname,               // Name of the image
                Body: req.file.buffer,                    // Body which will contain the image in buffer format
                ContentType: req.file.mimetype           // Necessary to define the image content-type to view the photo in the browser with the link
            };

            s3.upload(params).promise()
                .then((resp) => {

                    req.body.Location = resp.Location
                    next()

                })
                .catch((error) => {
                    console.log("error al obtener url desde aws", error)
                    req.body.Location = "error al subir imagen a aws"
                    next()
                })
        };

    } catch (error) {
        console.log("el error es:", error)
        next()
    }

}


module.exports = {
    deletePhoto,
    uploadPhoto
};












