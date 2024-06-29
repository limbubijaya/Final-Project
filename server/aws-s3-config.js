const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "",
});

const S3 = new AWS.S3();
module.exports = {S3: S3};