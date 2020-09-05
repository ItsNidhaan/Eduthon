const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000



app.use(express.static(path.join(__dirname + '/static')));


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname + '/static/index.html'));
})




app.listen(PORT);