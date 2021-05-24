const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../model/user');
const emailCheck = require('email-check');


router.get('/register',(req,res)=>{
    res.render('auth/register');
});

router.post('/register',async(req,res)=>{
    emailCheck(`${req.body.email}`,{timeout:90000})
        .then(async()=>{
            const user = new User({email:req.body.email, username:req.body.username});
            await User.register(user,req.body.password);
            req.flash('success','Registered successfully!!!');
            res.redirect('/blog');
        })
        .catch(function (err) {
            req.flash('error','Please enter a valid email id');
            console.log(err.message);
            res.redirect('/register');
        });
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