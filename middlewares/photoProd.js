const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();


const uploadPhoto = async (req, res, next) => {
    archivoPhoto = req.body
    console.log(archivoPhoto)
    const photo = await s3.putObject({
        Body: "hello wrold",
        Bucket: "productos-papel",
        Key: archivoPhoto
    }).promise()

    next()
}

module.exports = uploadPhoto;

