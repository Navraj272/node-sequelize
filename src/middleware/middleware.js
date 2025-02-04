const jwt = require('jsonwebtoken')


const verifyToken=(req,res,next)=>{
    // header se 
    const token = req.header("Authorization")

    if(!token) return res.status(401).send("Access Denied")
        
    try{
        // console.log("Received Token:", token);

        // console.log("Splitting the token : ",token.split(" ")[1])

        const verified = jwt.verify(token.split(" ")[1],"N@vrajj272")
        console.log("Verified Token:", verified)
        req.user = verified
        console.log("Req.User",req.user)
        next()
    }
    catch(err){
        res.status(400).json({error:"Token is not valid"})
    }
}



module.exports = verifyToken

// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {

//     const token = req.header("Authorization");

//     if (!token) {
//         return res.status(401).json({ error: "Access Denied. No token provided." });
//     }

//     const tokenParts = token.split(" ")[1];
    

//     try {
//         const verified = jwt.verify(tokenParts, "N@vrajj272");
//         req.user = verified;
//         next();
//     } catch (err) {
//         return res.status(401).json({ error: "Token is not valid or has expired." });
//     }
// };

// module.exports = verifyToken;




