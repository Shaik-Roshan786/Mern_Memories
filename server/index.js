import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'

const app = express();
const url = 'mongodb+srv://Roshan:Roshan786@cluster0.eoiy197.mongodb.net/test?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json({ limit:"30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }));
app.use(cors())

app.use('/posts', postRoutes);


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

  app.listen(5000, () => {
    console.log("Server is Running on 5000");
});