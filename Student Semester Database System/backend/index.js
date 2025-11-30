import express from 'express';
import mongoose from 'mongoose';
import router from './routes/login.js';
import cors from 'cors'; 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/database')
.then(async () => {
  console.log("Mongo DB Connected");


})
.catch(err => console.error(err));


app.use('/Login',router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});    

export default app;