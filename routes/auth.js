var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');

const collectionName = 'users';

var user = require('../users/user');
router.post('/login', function (req, res) {
    console.log(req.body);
    user.find({ email: req.body.email})
        .exec()
        .then(function(users){
            if(users.length<1){
                return res.status(401).json({
                    message: "User auth failed"
                });
            }
            if(users[0].password === req.body.password){
                const token = jwt.sign({
                    email: users[0].email,
                    userId: users[0]._id
                },
                "secret",
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: "Auth successful",
                    token: token
                });
            }else{
                return res.status(401).json({
                    message: "User auth failed"
                });
            }
        })
        .catch(function(err){
            res.status(500).json({
              error: err
            });
        });
});
// Return router
module.exports = router;