// Dependencies
const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

var project = require('./models/project');
var user = require('./models/user');

const uri = "mongodb+srv://jayamal:TBBo2cw6fz5vT4By@spectre-h7vto.mongodb.net/test?retryWrites=true&w=majority";

// define Express app
const app = express();

// add Helmet to enhance the API security
app.use(helmet());

// add bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// enable Cross-Origin Resource Sharing, CORS for all requests
app.use(cors());

// add Morgan to log HTTP requests
app.use(morgan('combined'));
// app.use('/', require('./routes/api'));
// app.use('/user', require('./routes/user'));
// app.use('/project', require('./routes/projects'));
app.use(router);

//projects end point
router.post('/project/', function (req, res) {

    var tempProject = {
        projectName: req.body.projectName,
        likes: req.body.likes,
        projectImage: req.body.projectImage
    };
    console.log(tempProject);
    let newProject = new project(tempProject);
    newProject.save()
        .then(data => {
            if (data.length < 1) {
                return res.status(400).json({
                    message: "Project creation failed",
                });
            }
            else {
                return res.status(200).json({
                    message: "Project created successfully"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        })
});

router.get('/project/', function (req, res) {

    project.find({})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        })
});

router.put('/project/:projectName/likes/:likeCount', function (req, res) {
    var projectName = req.params.projectName;
    var count = req.params.likeCount;
    count++;
    console.log("here")
    console.log(projectName + " " + count)
    project.findOneAndUpdate({projectName: projectName}, {$set: {likes: count}}).then(data => {
        if (data.length < 1) {
            return res.status(400).json({
                message: "Project not found",
            });
        }
        else {
            return res.status(200).json({
                message: "Project likes updated successfully"
            });
        }
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    })
});


//user end point
router.post('/user/auth/login', function (req, res) {
    console.log(req.body);
    user.find({ email: req.body.email})
        .exec()
        .then(function(users){
            if(users.length<1){
                return res.status(200).json({
                    message: "User not found"
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

router.post('/user/auth/register', function (req, res) {
    var user1 = {
        email: req.body.email,
        password: req.body.password
    };
    let newUser = new user(user1);
    newUser.save()
        .then((data) => {
            if(data.length<1){
                return res.status(400).json({
                    message: "Registration Not successfull"
                });
            }
            else{
                return res.status(200).json({
                    message: "Registration successful",
                    token: token
                });
            }
        })
        .catch((error)=>{
            res.status(500).json({
                error: error
            });
        })

});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
    mongoose.connect(uri, {useNewUrlParser: true})
        .catch(error => console.log(error));
    mongoose.connection.on('error', err => {
        console.log(err);
    });

});
