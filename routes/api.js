/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const mongoose=require('mongoose');
const project=require('./../models/project.js') 
//MongoClient.connect(CONNECTION_STRING, function(err, db) {});
// mongoose.connect(connection_string,({useNewUrlParser: true, useUnifiedTopology: true}));
module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      //req.query: issue_title,issue_text,created_by,assigned_to,status_text,created_on&_from_to,updated_on&_from_to, open
      var projectSearch = req.params.project;
      var arrayIssue=[];
      project.findOne({projectName: projectSearch})
      .then((result)=>{
        if(!result){
          res.send("Project not Found")
        }else{
          arrayIssue=result.issues;
          var updated_on_to;
          var created_on_to;
          for(let i =arrayIssue.length-1;i>=0;i--){//filter with query
            if(req.query.created_on_to!=undefined){//date start in 12.00am which might not be good for some filter
              created_on_to=new Date(req.query.created_on_to);
              created_on_to.setDate(created_on_to.getDate()+1);
            }
            if(req.query.updated_on_to!=undefined){
              updated_on_to=new Date(req.query.updated_on_to);
              updated_on_to.setDate(updated_on_to.getDate()+1);
            }
            if(arrayIssue[i].issue_title!=req.query.issue_title && req.query.issue_title!=undefined ||
              arrayIssue[i].issue_text!=req.query.issue_text && req.query.issue_text!=undefined ||
              arrayIssue[i].created_by!=req.query.created_by && req.query.created_by!=undefined ||
              arrayIssue[i].assigned_to!=req.query.assigned_to && req.query.assigned_to!=undefined ||
              arrayIssue[i].status_text!=req.query.status_text && req.query.status_text!=undefined ||
              arrayIssue[i].created_on<new Date(req.query.created_on_from) && req.query.created_on_from!=undefined ||

              arrayIssue[i].created_on>created_on_to && req.query.created_on_to!=undefined ||
              arrayIssue[i].updated_on<new Date(req.query.updated_on_from) && req.query.updated_on_from!=undefined||

              arrayIssue[i].updated_on>updated_on_to && req.query.updated_on_to!=undefined ||
              arrayIssue[i].open!=(/true/i).test(req.query.open) && req.query.open!=undefined){
              arrayIssue.splice(i,1);
            }
          }
          res.send(arrayIssue);
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    })
    
    .post(function (req, res){
      var newIssue={
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        created_on: new Date(),
        updated_on: new Date(),
        open: true
      }
      var projectSearch = req.params.project;
      project.findOne({projectName: projectSearch})
      .then((result)=>{
        if(!result){
          return result;
        }
        result.issues.push(newIssue);
        return result;
      })
      .then((result)=>{
        if(!result){
          res.send('Project not Found')
        }else{
          result.save();
          res.send(newIssue);
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    })
    //urusin update issue 
    .put(function (req, res){
      var projectSearch = req.params.project;
      var foundIssue=false;
      project.findOne({projectName: projectSearch})
      .then((result)=>{
            if(!result){//if no project found
              console.log('no project found')
              return null;
            }
            result.issues.forEach(issue => {
            if(issue._id==req.body.issue_id){
              foundIssue=true;
              if(req.body.issue_title!=""){
                issue.issue_title=req.body.issue_title
              }
              if(req.body.issue_text!=''){
                issue.issue_text=req.body.issue_text;
              }
              if(req.body.created_by!=''){
                issue.created_by=req.body.created_by;
              }
              if(req.body.assigned_to!=''){
                issue.assigned_to=req.body.assigned_to;
              }
              if(req.body.status_text!=''){
                issue.status_text=req.body.status_text;
              }
              if(req.body.open=='on'){
                issue.open=false;
              }
                issue.updated_on=new Date();
            }
            else if(issue._id==req.body._id){
              issue.open=JSON.parse(req.body.open);
              foundIssue=true;
            }
        });
        if(foundIssue==false){//if no issue found
          console.log('no issue found')
          return null;
        }
       return result.save()
      })
      .then((result)=>{
        // res.send(result);
        if(result==null){//not found
          res.send('could not update '+req.body.issue_id);
        }else if(req.body.issue_title==''&&req.body.issue_text==''&&req.body.created_by==''&&//if no update field
        req.body.assigned_to==''&&req.body.status_text==''&&req.body.open==''){
          res.send('no updated field sent')
        } else{//found and updated
          res.send('successfully updated')
        }
      })
      .catch((err)=>{
        res.send('some error happened')
        console.error(err);
      })
    })
    //urusin delete issue
    .delete(function (req, res){
      var projectSearch = req.params.project;
      var deletedIssue;
      var foundIssue=false;;
      project.findOne({projectName: projectSearch})
      .then((result)=>{
        if(req.body.issue_id==''){
          return 'no_id';
        }
        if(!result){
          console.log('result null');
          return null;
        }
        result.issues.forEach((ele,index)=>{
          if(ele._id==req.body.issue_id){
            deletedIssue=result.issues.splice(index,1);
            foundIssue=true;
          }
        })
        if(foundIssue==false){
          return null;
        }
        return result;
      })
      .then((result)=>{
        if(!result){
          return null;//if no project or issue not found
        }
        if(result=='no_id'){
          return 'no_id';
        }
        return result.save();
      })
      .then((result)=>{
        if(!result){
          res.send({failed: 'could not delete '+req.body.issue_id})
        }else if(result=='no_id'){
          res.send('id error')
        }else{
        res.send({ success: 'deleted '+req.body.issue_id});
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    });

    app.route('/api/project')
    .post((req,res)=>{
        var newProject = new project ({
          projectName: req.body.project_name
        })
        newProject.save()
        .then((result)=>{
          console.log('save success');
          console.log(result);
          res.send(result);//send the result to the jquery success so it can be displayed
        })
        .catch((err)=>{
          console.error(err);
          res.send('error on saving new Project')
        })
    })
    .delete((req,res)=>{
      project.findOneAndDelete({projectName: req.body.project_name})
      .then((result)=>{
        console.log(result);
        res.send(result);
      })
      .catch((err)=>{
        console.error(err);
        res.send('error on deleting new project');
      })
    })
    .get((req,res)=>{
      var resultArr=[];
      project.find()
      .then((result)=>{
        result.forEach((ele)=>{
          var resultProject={
            projectName:ele.projectName,
            _id:ele._id
          }
          resultArr.push(resultProject);
        })
        res.send(resultArr);
      })
      .catch((err)=>{
        console.error(err);
      })
    })
    
    
};
