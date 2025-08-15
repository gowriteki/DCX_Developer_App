import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

export const verifyToken=(req,res,next)=>{
    const token=req.header('Authorization');
    console.log(token)
        if(!token) return res.status(401).json(
            {erorr:'Access denied'}
    
        );
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.userId=decoded.userId;
            next();
        }
            catch(error){
                res.status(401).json({"error":error.message})
    
            }
}