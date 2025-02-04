const adminauth=(req,res,next)=>{
    if(req.user.role==="admin"){
        next()
    }
    else{
        return res.status(401).json({erroe:"Not an admin"})
    }
}

module.exports= adminauth;