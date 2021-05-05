const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blog');
// const seedDB = require('./seed');

const flash = require('connect-flash');
const session = require('express-session');



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(blogRoutes);



const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogApp', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(()=>{
    console.log("DB Connected");
})
.catch(err=>{
    console.log(err);
})


// seedDB();



app.listen(3000,()=>{
    console.log('Server started on Port 3000');
})