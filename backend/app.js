import 'dotenv/config'

import express from 'express';

import helmet from 'helmet';

import mongoose from 'mongoose';

import authRoute from './routes/auth.js';
import unitRoute from './routes/units.js';

const username = encodeURIComponent(process.env.mongo_username);
const password = encodeURIComponent(process.env.mongo_password);

const cluster = 'cluster0.qn9mq.mongodb.net/credentials-manager?retryWrites=true&w=majority'

const uri = `mongodb+srv://${username}:${password}@${cluster}`;

try {
  mongoose.connect(uri);
} catch (err) {
  console.log(err);
}



const app = express();

app.use(helmet());

app.use(express.json());

app.use('/auth', authRoute);
app.use('/units', unitRoute);


export default app;
