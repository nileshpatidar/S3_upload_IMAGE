var express = require('express');
var router = express.Router();
var { profile_upload } = require("../controller/imageupload");
var  upload = require("../s3_service/aws_s3");

router.route('/profileupload')
    .post(upload.single('image'),profile_upload)


module.exports= router;