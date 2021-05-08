const express = require('express');
const router = express.Router();
const Blog = require('../model/blog');
const Review = require('../model/review');
const {isLoggedIn} = require('../middleware');
const User = require('../model/user');


router.get('/',(req,res)=>{
    res.redirect('/blog');
})

router.get('/blog',async (req,res)=>{
    try{
        const blogs = await Blog.find({});
        res.render('blog/index',{blogs});
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Could not load blogs!!!');
        res.redirect('error');
    }
});


//TO GET NEW FORM
router.get('/blog/new',(req,res)=>{
    res.render('blog/new');
});

router.post('/blog',isLoggedIn,async(req,res)=>{
    try{
        //to save the post in blog model
        const blog = await Blog.create(req.body.blog);

        //to save the post in user's my posts array
        const user = req.user;
        user.myPosts.push(blog);
        await user.save();

        req.flash('success','Blog created successfully!!!');
        res.redirect('/blog');
    }
    catch(e){
        req.flash('error','Failed to create blog!!!');
        res.redirect('/blog');
    }
})


// DISPLAY SINGLE DOCUMENT
router.get('/blog/:id',async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id).populate('reviews');
        res.render('blog/show',{blog}); 
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Could not find this blog');
        res.redirect('/error');
    }
})



// TO EDIT DETAILS
router.get('/blog/:id/edit',async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id);
        res.render('blog/edit',{blog});
    }
    catch(e){
        req.flash('error','Blog does not exist!!!');
        res.redirect('/error');
    }
})

router.patch('/blog/:id',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id , req.body.blog);
        req.flash('success','Blog Updated');
        res.redirect(`/user/${req.user._id}/posts/${req.params.id}`);
    }
    catch(e){
        req.flash('error','Failed to update the blog');
        res.redirect(`/blog/${req.params.id}`);
    }
})



// TO DELETE DOCUMENT
router.delete('/blog/:id',isLoggedIn,async(req,res)=>{
    try{    
        //to delete from Blog model
        await Blog.findByIdAndDelete(req.params.id);
        //to delete from myPosts array present in User model
        await User.findByIdAndUpdate(req.user._id,{$pull:{myPosts:req.params.id}}); 
        
        req.flash('success','Blog deleted successfully!!!');
        res.redirect(`/user/${req.user._id}/posts`);
    }
    catch(e){
        req.flash('error','Failed to delete Blog!!!');
        res.redirect(`/blog/${req.params.id}`);
    }
});






//Add Review
router.post('/blog/:id/review',isLoggedIn,async(req,res)=>{
    const review = new Review(req.body);
    const blog = await Blog.findById(req.params.id);

    blog.reviews.push(review);

    await review.save();
    await blog.save()

    res.redirect(`/blog/${req.params.id}`);
})


router.get('/error',(req,res)=>{
    res.status(500).render('error');
})




module.exports = router;