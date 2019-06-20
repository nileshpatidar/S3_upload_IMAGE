
async function aws_profile_upload(req,res){
    try{
        console.log(req.file.location)
        // YOU  CAN SAVE HERE  IN DB YOUR S3PATH
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports.profile_upload = aws_profile_upload;

