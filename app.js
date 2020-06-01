const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');


const challengeData = require('./routes/challengeDataRoutes');
const getChallengeData = require('./routes/getChallengeRoutes');

//Setting Port
var port = process.env.PORT || 3000;

app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.get('/',(req,res)=>{
    res.status(200).send('This is it');
})

// app.use(express.static(__dirname + '/client/dist/inno-apps'));

// app.get('/*', function(req,res) {
// res.sendFile(path.join(__dirname+'/client/dist/inno-apps/index.html'));
// });


//set up routes
app.use('/api/challenge', challengeData);
app.use('/api/getChallenges', getChallengeData);

// Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
    res.status(404).send('404: File Not Found');
});

app.listen(port,()=>{
	console.log('app now listening for request on port 3000');
});