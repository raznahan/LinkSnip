import express from  'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


//basic route to check if servier is running
app.get('/', (req:any, res:any) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});