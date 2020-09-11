const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var projectSchema=new Schema({
    projectName: {type: String, unique: true},
    issues: [{
        issue_title: String,
        issue_text: String,
        created_by: String,
        assigned_to: String,
        status_text: String,
        created_on: Date,
        updated_on: Date,
        open: Boolean
    }]
}, {versionKey: false})

module.exports=mongoose.model('project', projectSchema)