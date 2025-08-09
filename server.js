const express = require('express');
const userRoutes=require("./routes/userRoutes");
const logger = require('./config/logger');
const cors=require("cors");


const app=express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    logger.info('Root endpoint hit');
    res.send('Hello World to backend');
});
app.use('/api/users',userRoutes);
app.listen(5000 | process.env.PORT,()=>{
    console.log(`backend is started running on http://localhost:${process.env.PORT}/`);
})
