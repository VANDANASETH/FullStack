const bcrypt = require('bcrypt');
const UserModel = require("../Models/userModel")

const signup = async(req,res) =>{
    try {
        console.log("Incoming Request", req.body)
        const{name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        console.log("Exsisting user", user)
        if(user){
            return res.status(409).json({
                message:"User is already exsists you can login",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("hassed password", hashedPassword);
        const newUser = new UserModel({name, email, password: hashedPassword});
        // newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        console.log("User saved successfully")
        res.status(201).json({
            message:"Signup successfully",
            success: true
        })
    } catch (err) {
        console.error("SignUP error", err)
        res.status(500).json({
            message:"Internal server error",
            success: false
        })
    }
}

module.exports = {signup}