const express = require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const adminRoutes=require('./routes/adminRoutes');
const blogRoutes=require('./routes/blogRoutes');
const authRoutes=require('./routes/authRoutes');
const {requireAuth,checkUser}=require('./middlewares/authMiddleware');

const app = express();
const dbURL='mongodb+srv://arda:199682Arda.@cluster0.g93pw.mongodb.net/?retryWrites=true&w=majority&appName=node-blog';

mongoose.connect(dbURL)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));


app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());

app.get('*',checkUser);

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

    res.redirect('/blog');
})

app.use('/',authRoutes);
app.use('/blog',blogRoutes);
app.use('/admin',requireAuth,adminRoutes);



app.get('/about',(req,res)=>{
    res.render('about',{title:'Hakkımızda'});
})

app.get('/about-us',(req,res)=>{
    res.redirect('/about',{title:'Hakkımızda'});
})



app.use((req,res)=>{
    res.status(404).render('404',{title:'Sayfa Bulunamadı'});
})