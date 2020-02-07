var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
var mkdirp = require('mkdirp');

mkdirp('uploads/test/');
var s3 = new aws.S3({
    accessKeyId: "YOURKEY",
    secretAccessKey: "YOURACCESSKEY",
})
// aws.config.update({
//     accessKeyId: 'YOUR-ACCESS_KEY',
//     secretAccessKey: 'YOUR_SECRET-ACCESS_KEY'
// });

var localstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/test/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        return cb('jpeg,jpg ,png file are allowed',false)
    }
}

const storage = multerS3({
    s3: s3,
    bucket: 'yourbucketname',
    acl: 'public-read ',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]) //image name with timestamp
    }
})
var upload = multer({
    storage: storage,
    fileFilter:fileFilter,
}).single('image')


var local_upload = multer({
    storage:localstorage,
    fileFilter: fileFilter,
}).array('photos', 5)

var imageupload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'Uploads',
      acl: 'public-read',
      metadata: function (req, file, cb) {
          
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, "temp/" + Date.now().toString() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
      }
    })
  })
  
  var imageuploadaarray = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'uploads',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        //   if you want to check extention of file write condition here
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, "temp/" + Date.now().toString() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
      }
    })
  })
  async function movefiles3bucket(sourcefile, newpath) {
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: ' uploads', /* Another bucket working fine */
        CopySource: '/uploads/' + sourcefile, /* required */
        Key: newpath, /* required */
        ACL: 'public-read',
      };
      s3.copyObject(params, function (err, data) {
        if (err)
  
          //reject(err);
          console.log("err", err); // an error occurred
        else {
          resolve(data);
          //console.log(data); // successful response
        }
      });
    })
  }
  


module.exports.upload = upload ; 
module.exports.movefiles3bucket = movefiles3bucket ; 
module.exports.local_upload=local_upload;
module.exports.uploadfile = imageupload.single('image');
module.exports.uploadfileaarray = imageuploadaarray.array('image');

