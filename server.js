// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB
mongoose.connect('mongodb://localhost:27017/rest_test', {useNewUrlParser: true});

// Express
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// enable Cross-Origin Resource Sharing, CORS for all requests
app.use(cors());

// add Morgan to log HTTP requests
app.use(morgan('combined'));

// define an endpoint to return all profiles
app.get('/', async (req, res) => {
   res.send(await getProfile());
});

//Login
app.post('/login', async (req, res) => {
   //var email = req.userEmail;
   //var password = req.userPassword;
   console.log(req.body);
   res.send(await getProfile());
   res.send({ message: 'logged in - ok'});
})

app.post('/register', async (req, res) => {
   const newProfile = req.body;
   const testProfile = {Name: 'Ivan', email: 'exampleEmail@email.com', password: 'spectre'};
   await insertProfile(newProfile);
   res.send({ message: 'New profile inserted.'});
});

// check JSON Web Tokens
//JWT [Only checked for POST, DELETE, PUT endpoint. No authority required for GET request of this app to view]
//JWT will intercept requests to POST, DELETE, and PUT endpoints
const jwtCheck = jwt({
   secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri:'https://dev-q39f5c5h.au.auth0.com/.well-known/jwks.json'
   }),
   audience: 'https://profiles-api',
   issuer: 'https://dev-q39f5c5h.au.auth0.com/',
   algorithms: ['RS256']
})

//app.use(jwtCheck);

// POST, DELETE, PUT, startDatabase
app.post('/', async (req, res) => {
   const newProfile = req.body;
   const testProfile = {Name: 'Ivan', email: 'exampleEmail@email.com', password: 'spectre'};
   await insertProfile(nestProfile);
   res.send({ message: 'New profile inserted.'});
});

app.delete('/:id', async (req, res) => {
   await deleteProfile(req.params.id);
   res.send({ message: 'Profile removed.' });
});

app.put('/:id', async (req, res) => {
   const updatedProfile = req.body;
   await updateProfile(req.params.id, updatedProfile);
   res.send({ message: 'Profile updated.' });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
   await insertProfile({Name: 'Jayden P (first in DB)', email: 'exampleEmail@email.com', password: 'spectre' });
   console.log('--start database object created!--')
})
=======
// Routes
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

// Start Server
app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
    });