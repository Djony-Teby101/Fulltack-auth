const express= require('express')
const mysql= require('mysql')
const cors=require('cors')
const colors= require('colors')

const port=8081
const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const db=mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"signup_node"
})

app.get('/', (req,res)=>{
    res.status(200).json("Welcome to our api")
})

app.post('/signup', (req,res)=>{
    const sql="INSERT INTO login (`name`,`email`, `password`) VALUES(?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data)=>{
        if(err){
            return res.json("Error")
        };
        res.json(data)
    })
})


app.post('/login', (req,res)=>{
    const sql="SELECT * FROM login WHERE `email`=? AND `password`=?";
    
    db.query(sql, [req.body.email,req.body.password], (err, data)=>{
        if(err){
            return res.json("Error")
        };
        if(data.length > 0){
            return res.json("Success")
        }else{
            res.json("Failed")
        }
    })
})


app.listen(port,()=>console.log(`Server lancee sur le port: ${port}`.underline.cyan))