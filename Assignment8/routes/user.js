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
        res.redirect('/blog');
    }
})

router.get('/user/:userId/posts/:id',isLoggedIn,async(req,res)=>{
    try{
        const {userId , id} = req.params;
        const blog = await Blog.findById(id).populate('reviews');
        res.render('user/postDetails',{blog});
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect(`/user/${req.user._id}/posts`);
    }
})

router.post('/user/:userId/favourites/:id',isLoggedIn,async(req,res)=>{
    try{
        const {userId,id} = req.params;
        const blog = await Blog.findById(id);

        const user = req.user;
        user.favourites.push(blog);
        await user.save();

        req.flash('success','Blog added to favourites successfully');
        res.redirect(`/user/${userId}/favourites`);
    }
    catch(e){
        req.flash('error','Failed to load blog');
        res.redirect(`/blog`);
    }
})

router.get('/user/:userId/favourites',isLoggedIn,async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId).populate('favourites');
        res.render('user/favourites',{favourites : user.favourites})
    }
    catch(e){
        req.flash('error','Can\'t load your favourites. Try Again Later!!');
        res.redirect('/blog');
    }
})

router.get('/user/:userId/favourites/:id',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id).populate('reviews');
        res.render('user/favouriteDetails',{blog});
    }
    catch(e){
        req.flash('error','Can\'t load your favourites. Try Again Later!!');
        res.redirect(`/user/${req.params.userId}/favourites`);
    }
})

router.delete('/user/:userId/favourites/:id',isLoggedIn,async(req,res)=>{
    try{
        const {userId,id} = req.params;
        await User.findByIdAndUpdate(userId,{$pull:{favourites:id}});
        req.flash('success','Successfully removed blog from favourites');
        res.redirect(`/user/${userId}/favourites`);
    }
    catch(e){
        req.flash('success','Failed to remove the blog from favourites');
        res.redirect(`/user/${req.params.userId}/favourites`);
    }
})

module.exports = router;