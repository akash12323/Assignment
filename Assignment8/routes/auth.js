const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../model/user');


router.get('/register',(req,res)=>{
    res.render('auth/register');
});

router.post('/register',async(req,res)=>{
    const user = new User({email:req.body.email, username:req.body.username});
    await User.register(user,req.body.password);
    req.flash('success','Registered successfully!!!');
    res.redirect('/blog');
})



router.get('/login',(req,res)=>{
    res.render('auth/login');
});

router.post('/login',
    passport.authenticate('local',{
        failureRedirect:'/login',
        failureFlash:true
    }),
    (req,res)=>{
        req.flash('success',`Login Successful Welcome Back ${req.user.username}`);
        res.redirect('/blog');
    }
)


router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','Loggged out successfully');
    res.redirect('/blog');
})



module.exports = router;