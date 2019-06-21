
async function aws_profile_upload(req,res){
    try{
        console.log(req.file.location)
        // YOU  CAN SAVE HERE  IN DB YOUR S3PATH
    }catch(err){
        console.log(err);
        return err;
    }
}

async function localimageupload(req,res){
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


module.exports.profile_upload = aws_profile_upload;
module.exports.uploadimage = localimageupload;

