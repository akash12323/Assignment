const express = require('express');
const { isLoggedIn } = require('../middleware');
const Blog = require('../model/blog');
const User = require('../model/user');
const router = express.Router();


router.get('/user/:userId/posts',isLoggedIn,async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId).populate('myPosts');
        res.render('user/posts',{myPosts : user.myPosts});
    }
    catch(e){
        req.flash('error','Can\'t load your posts');
        res.redirect('/products');
    }
})

router.get('/user/:userId/posts/:id',isLoggedIn,async(req,res)=>{
    try{
        const {userId , id} = req.params;
        const blog = await Blog.findById(id).populate('reviews');
        res.render('user/details',{blog});
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect(`/user/${req.user._id}/posts`);
    }
})

module.exports = router;