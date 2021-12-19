const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Post=require('./src/model/post');
const post = require('./src/model/post');




const app=express();
const db=mongoose.connect('mongodb://localhost:27017/first-node-api');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/',function(req,res){
    res.send({pnig:'pong'})
})

//create api
app.post('/posts',function(req,res){

    //get value from required payload
    const title=req.body.title;
    const author=req.body.author;
    const content=req.body.content;

    //Asign value in the post model

    var post=new Post();
    post.title=title;
    post.author=author;
    post.content=content;
    post.save(function(err,save){
        if(err)
        {
            res.status(500).send({err:'there is a error occure...'})
        }
        else
        {
            res.status(200).send({save:'save successfully'})
        }
    })

   // res.send({title: title,author:author,content:content})
});

//update api without replace

app.patch('/posts',function(res,req){

    //for first match update
   

    const result=Post.findOneAndUpdate({_id},{},{useFindAndModify:false},function(err,update){
    
        if(err)
        {
            res.status(400).send({err:'there is a error occure...'})
        }
        else
        {
            res.status(200).send({update:'save successfully'})
        }
    })
   
});
//Delete api 

app.delete('/posts',function(res,req){

    //for first match update
   

    const result=Post.findOneAndDelete({_id},{},{useFindAndModify:false},function(err,update){
    
        if(err)
        {
            res.status(400).send({err:'there is a error occure...'})
        }
        else
        {
            res.status(200).send({update:'save successfully'})
        }
    })
   
});

app.delete('/posts',function(res,req){

    //for first match delete
    Post.delete({},function(err,deletePost){
        if(err)
        {
            res.status(500).send({err:'there is a error occure...'})
        }
        else
        {
            res.status(200).send({deletePost:'save successfully'})
        }
    })
    
});

app.listen('3001',function(){
    console.log('We are from 3000 server port...');
})