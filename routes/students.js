var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const studentModel = require('../models/student.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('student route');
});

router.post('/add', function(req, res, next) {
    let newStudent = new studentModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        dob: req.body.dob,
        department: req.body.department,
        email:req.body.email,
       
    });

    newStudent.save(function(err,newStudent){
        if(err)
        res.send(err);
        else
        res.send({status:200,message:'User Added Successfully',studentobj:newStudent});
    })
   
  });
//get all data
  router.get('/list', function(req, res, next) {
   studentModel.find(function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200,students:response})
   })
  });
//get data based on query
router.get('/searchbyfname', function(req, res, next) {
    const firstnamequery = req.query.firstName;
    studentModel.find({firstName: firstnamequery},function(err,response){
     if(err)
     res.send(err);
     else
     res.send({status:200,resultsFound:response.length,students:response})
    })
   });
//get data based on id
router.get('/searchbyid', function(req, res, next) {
    const idquery = req.query.id;
    studentModel.findById(idquery,function(err,response){
     if(err)
     res.send(err);
     else
     res.send({status:200,students:response})
    })
   });
//update based on query
router.put('/update', function(req, res, next) {
    const firstnamequery = req.query.firstName;
    const dept = req.query.department;
    studentModel.update({firstName: firstnamequery},{department:dept},function(err,response){
     if(err)
     res.send(err);
     else
     res.send({status:200,students:response})
    })
   });
//update based on id
router.put('/updatebyid', function(req, res, next) {
    const id = req.query.id;
    const firstName = req.query.firstName;
    studentModel.findByIdAndUpdate(id,{firstName:firstName},function(err,response){
     if(err)
     res.send(err);
     else
     res.send({status:200,students:response})
    })
   });
//update first doc based on id
router.put('/updatefirst', function(req, res, next) {
    const lastName = req.query.lastName;
    const dept = req.query.department;

    studentModel.findOneAndUpdate({department:dept},{lastName:lastName},function(err,response){
     if(err)
     res.send(err);
     else
     res.send({status:200,students:response})
    })
   });
 //delete docs
 router.delete('/deletebyid', function(req, res, next) {
    const id = req.query.id;

    studentModel.findByIdAndDelete(id,function(err,response){
     if(err)
     res.send(err);
     else
     res.send({status:200,students:response})
    })
   });  
   //remove
   router.delete('/remove', function(req, res, next) {
    const lastName = req.query.lastName;

    studentModel.remove({lastName:lastName},function(err,response){
     if(err)
     res.send(err);
     else
     res.send({status:200,students:response})
    })
   });   
   //remove first doc
   router.delete('/removefirst', function(req, res, next) {
    const dept = req.query.department;

    studentModel.findOneAndRemove({department:dept},function(err,response){
     if(err)
     res.send(err);
     else
     res.send({status:200,students:response})
    })
   });   
   
module.exports = router;