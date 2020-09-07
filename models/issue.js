const mongoose =require('mongoose');
const Schema = mongoose.Schema;

var issueSchema= new Schema({
    issueTitle: String,
    issueText: String,
    createdBy: String,
    assignedTo: String,
    statusText: String,
    createdOn: Date,
    updatedOn: Date,
    open: Boolean
})
module.exports=mongoose.model('issue',issueSchema);