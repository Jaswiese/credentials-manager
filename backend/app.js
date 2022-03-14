import 'dotenv/config'
import express from 'express';
// helmet imported for security
import helmet from 'helmet';
// mongoose imported for mongodb compatibility
import mongoose from 'mongoose';
// app routes imported
import authRoute from './routes/auth.js';
import unitRoute from './routes/units.js';
import userRoute from './routes/users.js';
// mongo credentials declared
const username = encodeURIComponent(process.env.mongo_username);
const password = encodeURIComponent(process.env.mongo_password);
const cluster = 'cluster0.qn9mq.mongodb.net/credentials-manager?retryWrites=true&w=majority'
const uri = `mongodb+srv://${username}:${password}@${cluster}`;
// connection to mongodb
try {
  mongoose.connect(uri);
} catch (err) {
  console.log(err);
}
// express app declared
const app = express();
// set to use helmet for security
app.use(helmet());
// json parser added
app.use(express.json());
// routes declared
app.use('/auth', authRoute);
app.use('/units', unitRoute);
app.use('/user', userRoute);

export default app;
