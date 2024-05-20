import express from 'express'
import MainRouter from './ui/routes/MainRouter.js'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { SessionSetting } from './security/settings/SessionSetting.js'
import { PassportSetting } from './security/settings/PassportSetting.js'
import cookieParser from 'cookie-parser'
import { AttackSetting } from './security/settings/AttackSetting.js'
import { BodyParserSetting } from './security/settings/BodyParserSetting.js'

const app = express()
const PORT = process.env.PORT || 3000 
const URI ='mongodb://0.0.0.0:27017/TahlildadehVOD'

// ejs configs
app.set('view engine',"ejs")
app.set('views',path.join(process.cwd(),'/ui/views'))
// statics config
app.use(express.static(path.join(process.cwd(),'/ui/public')))
// session pipeline
app.use(SessionSetting.makeSession(URI))
// DDos limiter pipeline
app.use(AttackSetting.ddosLimit())
// no-sql mongo sanitizer
app.use(AttackSetting.mongoSanitizer())
// http attacks
app.use(AttackSetting.httpProtection())




// app.use(express.urlencoded({extended:true}))
// app.use(express.json())
// form parser
app.use(BodyParserSetting.parseForm())
// json parser
app.use(BodyParserSetting.parseJson())

// xss attack pipeline
app.use(AttackSetting.xssProtection())
// hpp attack pipeline
app.use(AttackSetting.hppProtection())

// mongodb connection
mongoose.connect(URI)
.then(()=>{console.log('db connected ...')})

//passport configs
// strategy
PassportSetting.strategy()
//serializer
PassportSetting.serializer()
//deserializer
PassportSetting.deserializer()

// passport pipelines
// passport initializer
app.use(PassportSetting.initializer())
// passport sessionizer
app.use(PassportSetting.sessionizer())

// cookie parser
app.use(cookieParser())

// csrf pipeline
app.use(AttackSetting.csrfProtection())

// routes
app.use('/',MainRouter)

app.use((req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.render('404',{url:req.url})
        return
    }
})




app.listen(PORT,()=>{
    console.log(`server is listening on port :: ${PORT}`)
})