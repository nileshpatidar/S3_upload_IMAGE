var express = require('express');
var router = express.Router();
var { localimageupload, aws_profile_upload,uploadFileArray,uploadsinglefile} = require("../controller/imageupload");
var { upload, local_upload } = require("../s3_service/aws_s3");

router.route('/profileupload')
    .post(upload,aws_profile_upload)

    // for local folder uploade images multiples
router.route('/profileupload_inlocal')
    .post(local_upload, localimageupload);

router.route('/S3WithFormData')
    .post( uploadsinglefile);

router.route('/S3multipleImageS3WithFormData')
.post(uploadFileArray);

module.exports= router;
