const db = require('../configurations/db.config');
const User = db.user; 
const Contacts=db.contacts;

const createUser = async (req, res) => {
    
    try {
        // console.log("before",req.body)
        if (req.body.length>1){
            console.log(req.body)
            var user = await User.bulkCreate(req.body);
            
        }else{
            var user = await User.create(req.body);
            console.log("User created successfully");
        }

        
    
        return res.status(201).json({ user });
    
    
    } catch (error) {
        console.log("User creation failed", error);
        return res.status(500).json({ error: error.message });
    }
};

const onetoone=async(req,res)=>{
    try {
            const {firstName,lastName,permanent_address,current_address} = req.body;
            const user = await User.create({firstName,lastName});
            console.log("User created successfully");
        
            if(user && user.id){
                await Contacts.create({
                    permanent_address:permanent_address ,current_address:current_address ,user_id:user.id});
            }
        
    
        return res.status(201).json({ user });
    
    
    } catch (error) {
        console.log("User creation failed", error);
        return res.status(500).json({ error: error.message });
    }
}

const getOnetoone=async(req,res) => {
    try {
        const user = await User.findAll({
            attributes:['firstName','lastName'],
            include: [
                {
                    model: Contacts,
                    attributes: ['permanent_address','current_address'],
                },
            ],
        });
        return res.status(200).json({ user });
    } catch (error) {
        console.log("User creation failed", error);
        return res.status(500).json({ error: error.message });
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


module.exports = { createUser,onetoone,getOnetoone,deleteUser };
