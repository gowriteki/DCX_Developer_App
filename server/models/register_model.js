import mongoose from "mongoose";    

var register=mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']

      },
      password:
        {
            type: String,
            required: true,
            match: [
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Password must be at least 8 characters long and include at least one letter, one number, and one special character'
              ]
            
          }
      ,
      city: {
        type: String,
      
      },
      state: {
        type: String,
    
      },
      skills: {
        type: String,
        required: true
      },
      Availability: String,
      resume: Buffer
    
},{timestamps:true})

export default new mongoose.model('registers',register)