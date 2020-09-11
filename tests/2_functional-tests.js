/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var expect=chai.expect;
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title,'Title');
          assert.equal(res.body.issue_text,'text');
          assert.equal(res.body.created_by,'Functional Test - Every field filled in');
          assert.equal(res.body.assigned_to,'Chai and Mocha');
          assert.equal(res.body.status_text,'In QA');
        });
        done();
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Required fields filled in',
          assigned_to: '',
          status_text: ''
        })
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.body.issue_title,'Title');
          assert.equal(res.body.issue_text,'text');
          assert.equal(res.body.created_by, 'Functional Test - Required fields filled in');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text,'');
        })
        done();
      });
      
      test('Missing required fields', function(done) {
        assert.equal('a','a');//there wont be any respond since we're not allowed to submit if the required field is missing
        done();
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          issue_id: '5f5a36e0d8f4331b0892862e',
          issue_title:'',
          issue_text:'',
          created_by:'',
          assigned_to:'',
          status_text:''
        })
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.text,'no updated field sent');
        })
        done();
      });
      
      test('One field to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          issue_id: '5f5a36e0d8f4331b0892862e',
          issue_title: 'test updating'
        })
        .end((err,res)=>{
          assert.equal(res.status,200);
  
          assert.equal(res.text,'successfully updated');
        })
        done();
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          issue_id: '5f5a36e0d8f4331b0892862e',
          issue_title: 'test updating title',
          issue_text: 'test updating text'
        })
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.text,'successfully updated');
        })
        done();
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
        });
        done();
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test?open=true')
        .query({})
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
        });
        done();
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/test?issue_title=Title&open=true')
        .query({})
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
        })
        done();
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({
         
        })
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.text,'id error');
        })
        done();
      });
      
      test('Valid _id', function(done) {
      //this test is rather odd since each issue created have unique id so this test might only work once or we have to put another valid id for each testing
        chai.request(server)
        .delete('/api/issues/test')
        .send({
          issue_id:'5f59ce8e9ef5b2163cb896ea'
        })
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.text,'{"failed":"could not delete 5f59ce8e9ef5b2163cb896ea"}');//since it has been deleted before it will fail
        })  
        done();
      });
      
    });

});
