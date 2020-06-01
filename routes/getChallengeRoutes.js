const router = require('express').Router();
const keys = require('../config/keys');
const MongoClient = require('mongodb').MongoClient;
const challengeModel = require('../models/getChallengeModel');
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectId; 


router.get('/', (req, res) => {
    //res.status(200).render('pages/index.ejs');
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("PROD");
        dbo.collection("getChallengeDataCollection").find({}).toArray(function (err, result) {
            if (err) res.status(400).json("Error Connecting DB");
            res.status(200).json(result);
            db.close();
        });
    });

});

router.get('/:challenge', (req, res) => {
    //res.status(200).render('pages/index.ejs');
    console.log(req.params.challenge);
    MongoClient.connect(keys.mongodb.dbURI, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("PROD");
        dbo.collection("getChallengeDataCollection").find({_id : new ObjectId(req.params.challenge)}).toArray(function (err, result) {
            if (err) res.status(400).json("Error Connecting DB");
            res.status(200).json(result);
            db.close();
        });
    });

});


//create home route
// router.get('/view',(req,res)=>{
//     MongoClient.connect(keys.mongodb.dbURI,{useNewUrlParser:true}, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("PROD");
//         dbo.collection("challengeDataCollection").find({}).toArray(function(err, result) {
//           if (err) res.status(400).json("Error Connecting DB");
//           //console.log(result);
//           res.status(200).render('pages/cc-view.ejs',{data:result,length:result.length});
//           db.close();
//         });
//     }); 

// });



router.post('/delete', (req, res) => {
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("PROD");
        dbo.collection('challengeDataCollection', {}, function (err, solution) {
            solution.deleteMany({}, function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.status(200).redirect('/challenge');
                db.close();
            });
        });
    });
});

router.post('/delete/id', (req, res) => {
    MongoClient.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("PROD");
        var myquery = { _id: new mongodb.ObjectID(req.body.id) };
        dbo.collection("challengeDataCollection").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            res.status(200).redirect('/challenge');
            db.close();
        });
    });
});

module.exports = router;
