
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import menuRoutes from './routes/menuRoutes';
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use('/', menuRoutes);







mongoose.connect(process.env.MONGODB_URI as string, {

});





const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});




const PORT = process.env.PORT || 7890;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
