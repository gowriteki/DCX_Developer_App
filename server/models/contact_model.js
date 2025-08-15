import mongoose from "mongoose";

var contactSchema=new mongoose.Schema({
   fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    time: String,
    location: String,
    budget: Number,
    services: String,
    currentwebsite: String,
    noofpages: Number
  

})

export default new mongoose.model('Contact',contactSchema);