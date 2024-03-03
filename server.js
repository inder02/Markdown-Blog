const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const dotenv=require("dotenv")
const app = express()


// mongoose.connect('mongodb://127.0.0.1:27017/blogNew')
const password=process.env.MONGODB_PASSWORD;
 mongoose.connect(`mongodb+srv://21cse57inder:yS17ei5hB2KNgsuH@cluster0.01gyehi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)
dotenv.config();


const port= process.env.PORT || 5000
app.listen(port,()=>{
  console.log("app is listening")
})