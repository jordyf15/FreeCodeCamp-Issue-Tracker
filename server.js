'use strict';
var helmet=require('helmet');
var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');
var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner');
var ejs = require('ejs');
const mongoose=require('mongoose');
var app = express();

const connection_string= 'mongodb+srv://jordy:jordy123@cluster0.zxr52.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(connection_string,({useNewUrlParser: true, useUnifiedTopology: true}))
.then(()=>{
  console.log('Connected to Database');
  app.set('view engine','ejs');
  app.use(helmet());
app.use('/public', express.static(process.cwd() + '/public'));


app.use(cors({origin: '*'})); //For FCC testing purposes only



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.route('/:project/')
  .get(function (req, res) {
    // res.sendFile(process.cwd() + '/views/issue.html');
    res.render(process.cwd()+"/views/issue.ejs",{query: req.query})
   
  });

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index2.html');
  });

app.route('/api/projects')
.get((req,res)=>{
  res.sendFile(process.cwd()+'/views/projects.html');
})  
//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});
process.env.NODE_ENV='test';
//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 3500);
  }
});

module.exports = app; //for testing
})
.catch((err)=>{
  console.log('Failed to connect to Database')
})

