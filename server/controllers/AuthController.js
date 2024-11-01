import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";

const maxAge = 3*24*60*60*1000;
const createToken = (email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn: maxAge })
}
export const signup= async (req,res,next)=>{
    try{
        
        const {email,password}= req.body;
    if(!email || !password ){
        return res.status(400).send("Email and Password is required")
    } 
    const user =await User.create({email,password});
    res.cookie("jwt",createToken(email,user.id),{
        maxAge,
        secure: true,
        sameSite: "None",
    });
    return res.status(201).json({
        user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
        },
    })
     }
    catch(err){
        console.log({err});
        return res.status(500).send("Internal Server Error");
    }
}
export const login= async (req,res,next)=>{
    try{
        
        const {email,password}= req.body;
    if(!email || !password ){
        return res.status(400).send("Email and Password is required")
    } 
    const user =await User.findOne({email});
    if(!user){
        return res.status(404).send("User with entered email is not found")
    }
    const auth = await compare(password,user.password);
    if(!auth){
        return res.status(400).send("password is incorrect");
    }
    res.cookie("jwt",createToken(email,user.id),{
        maxAge,
        secure: true,
        sameSite: "None",
    });
    return res.status(200).json({
        user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
            firstName: user.firstname,
            color:user.color,
            image: user.image,
        },
    })
     }
    catch(err){
        console.log({err});
        return res.status(500).send("Internal Server Error");
    }
}
export const getUserInfo = async (req,res,next)=>{
    try{   
const userData = await User.findById(req.userId) ;
if(!userData) {
return res.status(404).send("User with the given id not found.");
}
    
    return res.status(200).json({
        
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstname,
            color:userData.color,
            image: userData.image,
        
    })
     }
    catch(err){
        console.log({err});
        return res.status(500).send("Internal Server Error");
    }
};
export const updateProfile = async (req,res,next)=>{
    try{   
const { userId } = req; 
const {firstName, lastName,color}= req.body;     

if(!firstName || !lastName ) {
return res.status(400).send("Firstname lastname and color is required.");
}
   
const userData = await User.findByIdAndUpdate(userId,{
    firstName,lastName,color,profileSetup:true
},{new:true,runValidators:true})
    return res.status(200).json({
        
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstname,
            color:userData.color,
            image: userData.image,
        
    })
     }
    catch(err){
        console.log({err});
        return res.status(500).send("Internal Server Error");
    }
};