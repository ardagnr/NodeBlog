const express = require('express');
const morgan=require('morgan');
const app = express();
app.set('view engine','ejs');

app.listen(3000);

app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/',(req,res)=>{

    res.render('index',{title:'Anasayfa'});
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