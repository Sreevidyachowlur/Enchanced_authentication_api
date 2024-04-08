const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const PORT=3000;

// app.post('/',(req,res)=>{
// console.log( req.body);
// res.send('success');
// })

require("./database");

app.use('/users', require('./Controller/user_controller'));
// app.use('/auth', require('./controller/auth-controller'));
// app.use('/leave', require('./controller/leave-controller'));

app.listen(PORT, () => {
  console.log("listening the port ",PORT);
});
