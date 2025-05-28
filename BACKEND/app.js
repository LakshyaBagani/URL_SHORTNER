import dotenv from 'dotenv';
import express from 'express';
import connectToDB from './src/config/mongoConfig.js';
import shortUrlRouter from './src/routes/shortUrlRoute.js'; 
import redirectToTheUrl from './src/routes/redirectToURL.js'; 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectToDB();

app.use('/create', shortUrlRouter); 
app.use('/', redirectToTheUrl );


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});