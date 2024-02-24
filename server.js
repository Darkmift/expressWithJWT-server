// libraries
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// functions, helpers and constants
import { PORT } from './config/config.js';
import { login } from './controllers/loginController.js';
import { calculate } from './controllers/calculateController.js';
import { verifyUser } from './middlewares/verifyUser.js';

// server initialization
const app = express();

// middleware to read and server json responses
app.use(express.json());
// middleware to use andwork with cookies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// not recommended! for the examination purposes only,
// should be a specific proper whitelist
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// the login route will provide authentication with the token from jwt
app.post('/login', login);

// the calculate route is protected by the token from the login route for the next 10 minutes
app.post('/calculate', verifyUser, calculate);

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});

export default app;