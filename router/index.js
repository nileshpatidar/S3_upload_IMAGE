var express = require('express');
var router = express.Router();
var { profile_upload, uploadimage} = require("../controller/imageupload");
var { upload, local_upload} = require("../s3_service/aws_s3");

router.route('/profileupload')
    .post(upload,profile_upload)

    // for local folder uploade images multiples
router.route('/profileupload_inlocal')
    .post(local_upload, uploadimage);

module.exports= router;
