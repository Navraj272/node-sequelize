const db = require('../configurations/db.config');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = db.user; 
const Contacts=db.contacts;

const SignUp = async (req, res) => {
    
    try {
        const {email,password,...userdata} = req.body;

        const exists = await User.findOne({
            where: {email}
        });

        if (exists) {
            return res.status(400).send('Email is already exists');
        }
            
        // if (Array.isArray(req.body)) {
            
        //     const usersData = await Promise.all(req.body.map(async user => ({
        //         firstName: user.firstName,
        //         lastName: user.lastName,
        //         email: user.email,
        //         password: await bcrypt.hash(user.password, 10)
        //     })));

        //     const users = await User.bulkCreate(usersData);
        //     return res.status(201).json({ users });
        // }
        
        // else{
            var user = await User.create({
                ...userdata,
                email,
                password: await bcrypt.hash(password,10)
            });
            console.log("User created successfully");
        // }

        
    
        return res.status(201).json({ user }); // yha se json ke alava bhi send krskte h
    
    
    } catch (error) {
        console.log("User creation failed", error);
        return res.status(500).json({ error: error.message });
    }
};


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;// user frontend se yha form ke through data dalta h
        
        const user = await User.findOne({
            where: {email}
        });
        if (!user) {
            return res.status(404).json('Email not found');
        }


        // password check krlo
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(404).json('Incorrect email and password combination');
        }


        // Authenticate user with jwt
        const token = jwt.sign({ id: user.id , role: user.role}, "N@vrajj272", {
            expiresIn: "1h"
        });
   
        res.status(200).json({ user, token });
    } catch (err) {
        return res.status(500).send('Sign in error');
    }
}
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'firstName', 'lastName', 'email','role', 'createdAt']
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });

    } catch (error) {
        console.error("Error fetching user info:", error);
        return res.status(500).json({ error: error.message });
    }
};


// const onetoone=async(req,res)=>{
//     try {
//             const {firstName,lastName,permanent_address,current_address} = req.body;
//             const user = await User.create({firstName,lastName});
//             console.log("User created successfully");
        
//             if(user && user.id){
//                 await Contacts.create({
//                     permanent_address:permanent_address ,current_address:current_address ,user_id:user.id});
//             }
        
    
//         return res.status(201).json({ user });
    
    
//     } catch (error) {
//         console.log("User creation failed", error);
//         return res.status(500).json({ error: error.message });
//     }
// }

// const getOnetoone=async(req,res) => {
//     try {
//         const user = await User.findAll({
//             attributes:['firstName','lastName'],
//             include: [
//                 {
//                     model: Contacts,
//                     attributes: ['permanent_address','current_address'],
//                 },
//             ],
//         });
//         return res.status(200).json({ user });
//     } catch (error) {
//         console.log("User creation failed", error);
//         return res.status(500).json({ error: error.message });
//     }
// }
const getAllUsers = async (req, res) => {
    try{
        const users=await User.findAll();
        return res.status(200).json({users})
    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await Contacts.destroy({ where: { user_id: id } });

        
        await User.destroy({ where: { id } });

        return res.status(200).json({ message: "User and associated contacts deleted successfully" });

    } catch (error) {
        console.log("User deletion failed", error);
        return res.status(500).json({ error: error.message });
    }
};


module.exports = { SignUp,deleteUser,getAllUsers,Login,getUserInfo };
// onetoone,getOnetoone