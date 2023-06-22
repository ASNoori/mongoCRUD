const mongoose = require('mongoose');
// const validate = require('mongoose-validator');

//create schema for database
const studentSchema = mongoose.Schema({
    StudId:Number,
    firstName: {
      type:String,
      required:true,
      maxLength:5
   },
    lastName: {
      type:String,
      required:true,
      minLength:3
    },
    age:{
      type:Number,
      required:true,
    },
    dob:{
      type:Date
    },
    department:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
      match: /.+\@.+\..+/
    }
   
   
 });

 //create model
 var studentModel = mongoose.model("Student",studentSchema);

 module.exports = studentModel;
 