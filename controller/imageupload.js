
var { uploadfile, movefiles3bucket ,uploadfileaarray} = require("../s3_service/aws_s3");
var s3bucketurl = "https://tesst.com"
  

const aws_profile_upload = async (req,res)=>{
    try{
        console.log(req.file.location)
        // YOU  CAN SAVE HERE  IN DB YOUR S3PATH
    }catch(err){
        console.log(err);
        return err;
    }
}

const uploadsinglefile = async (req, res) => {
    try {
        console.log(req);

        await uploadfile(req, res, async function (err) {
            if (err) {
                return res.status(500).send({ status: false, error: err });
            } else {
                // if formdata is not come then check your content type and bodyparser 
                var body = JSON.parse(req.body.data);//data comming from FORMDATA
                if (req.file) {
                    var onlyfilename = req.file.location.substring(req.file.location.lastIndexOf('/') + 1);
                   await movefiles3bucket(req.file.key, "image/" + "userid" + "/" + onlyfilename);
                    if (body._id) {
                        delete body._id
                    }
                    if (req.file === undefined || req.file === null || req.file === '') {
                    } else {
                        body.profile_image = s3bucketurl + "image/" + "userid" + "/" + onlyfilename;
                    }
                }
            }
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: { ...error }
        })
    }
}
const uploadFileArray = async (req, res) => {
    try {
        console.log(req);
        
            await uploadfileaarray(req, res, async function (err) {
                if (err) {
                    return res.status(500).send({ status: false, error: err });
                } else {
                    var body = JSON.parse(req.body.data);
                        if(req.files.length !== 0){
                           var image_path =[]
                            for(var i=0;i < req.files.length; i++){
                                var onlyfilename = req.files[i].location.substring(req.files[i].location.lastIndexOf('/') + 1);
                                var movefile = await s3.movefiles3bucket(req.files[i].key, body.userid + "/" +req.files[i].originalname + "/" + onlyfilename);
                                image_path.push(s3bucketurl + body.userid + "/" + req.files[i].originalname + "/"+onlyfilename)
                            }
                            res.send({
                                status: true,
                                message: 'Image uploaded',
                                image_path:image_path
                            })
                        }
                }
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send({ status: false, error: err });
    
        }
    }

    const localimageupload= async (req, res) => {
    try{
        var images = [];
        req.files.forEach(function(item){
            images.push(item.path); 
        })
        // now you can save images array in  your database
        console.log(images)
    }catch(err){
        console.log(err);
        return err;
    }
}


// module.exports.profile_upload = aws_profile_upload;
// module.exports.uploadimage = localimageupload;
module.exports = {uploadFileArray,uploadsinglefile,aws_profile_upload,localimageupload}
