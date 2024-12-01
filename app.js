const express = require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blogs');
const app = express();
const dbURL='mongodb+srv://arda:13211100Arda.@cluster0.g93pw.mongodb.net/?retryWrites=true&w=majority&appName=node-blog';

mongoose.connect(dbURL)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));


app.set('view engine','ejs');

app.use(express.static('public'));
app.use(morgan('dev'));

//EKLEME, HEPSİNİ GÖRÜNTÜLEME,ID'YE GÖRE GÖRÜNTÜLEME
/*
app.get('/add',(req,res)=>{
    const blog=new Blog({
        title:'yeni yazı 2',
        short:'kısa aciklama',
        long:'uzun aciklama'
    });
    blog.save()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.get('/all',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/single',(req,res)=>{
    Blog.findById('674c4e204cf1bc9df87a674c')
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        })
})
*/

app.get('/',(req,res)=>{

    Blog.find().sort({createdAt:-1})
        .then((result)=>{
          res.render('index',{title:'Anasayfa',blogs:result});
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'Hakkımızda'});
})

app.get('/about-us',(req,res)=>{
    res.redirect('/about',{title:'Hakkımızda'});
})

app.get('/login',(req,res)=>{
    res.render('login',{title:'Giriş'})
})

app.use((req,res)=>{
    res.status(404).render('404',{title:'Sayfa Bulunamadı'});
})