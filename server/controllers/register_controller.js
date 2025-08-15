import jwt from 'jsonwebtoken';
import RegisterModel from "../models/register_model.js";
import dotenv from "dotenv";
dotenv.config();
 
export const createProfile= async (req,res)=>{


try{
   var register= new RegisterModel({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.password,
    city:req.body.city,
    state:req.body.state,
    skills:req.body.skills,
    Availability:req.body.Availability,
    resume:req.file ? req.file.buffer : null 
   }) 
   await register.save()
   .then(result=>res.send(result))
   .catch(err=>{
    if(err.code === 11000 && err.keyValue.email) {
        res.status(400).send({ error: 'Email already exists' });
      } else {
        res.status(400).send({ error: err.message });
      }
}
    );
}
catch(err){
    console.error(err);
    res.send({"error":'Server error'})
}

}
export const getProfiles=(req,res)=>{
    try{
    var paramSkills=req.params.skills||''
    paramSkills===''?
    RegisterModel.find().select('-password')
    .then(result=>res.send(result))
    .catch(err=>res.send({"error":err})):
    RegisterModel.find({skills:{ $regex: new RegExp(`\\b${paramSkills}\\b`, 'i') }})
    .then(result=>res.send(result))
    .catch(err=>res.send({"error":err}));
}
catch(err){
    console.error(err);
    res.send({"error":'Server error'})
}

}
export const getProfile=(req,res)=>{
    try{
        
    RegisterModel.findOne({email:req.body.email,password:req.body.password})
    .then(result=>{if(result===null){
            res.send({message:"Invalid Credential"});
            return
        }
        const token= jwt.sign({ email:req.body.email,password:req.body.password},process.env.JWT_SECRET,{expiresIn:'1h'});
        const { password, ...dataWithoutSensitive } = result;

        
    res.send({
        message:'Success',
        token:token,
        data:dataWithoutSensitive
    })})
    .catch(err=>res.send({"error":err}));
}
catch(err){
    console.error(err);
    res.send({"error":'Server error'})
}

}
export const getResume=async(req,res)=>{
    try{
    await RegisterModel.findOne({_id:req.params.id}).select('resume')
    .then(result=>{ res.set({
        'Content-Type': 'application/pdf',      
        'Content-Disposition': 'inline'        
      });
      
        res.send(result.resume)})
        .catch(err=>res.send({"error":'Server error'}));
}
catch(err){
    console.error(err);
    res.send({"error":err})
}

}


export const updateProfile= async(req,res)=>{
    try{

    var register= new RegisterModel({
        _id:req.params.id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        city:req.body.city,
        state:req.body.state,
        skills:req.body.skills,
        Availability:req.body.Availability,
        
       }) 
       console.log(register)
     await  RegisterModel.findByIdAndUpdate(req.params.id,register)
       .then(result=>res.send(result))
       .catch(err=>{console.log(err)
        res.send({"error":err})
       }
    );
    }
    catch(err){
        
        console.error(err);
        res.send({"error":'Server error'})
    }


}