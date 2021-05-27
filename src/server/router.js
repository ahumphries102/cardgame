const express = require('express')
const Blog = require('./schema')
const router = express.Router()

router.get('/hotdog', (req, res)=>{
    res.send({username:'dug'})
})

router.get('/hotdog2', (req, res)=>{
    res.send({username:'dug2'})
})

router.post('/hotdog3', (req, res)=>{
    const blarg = new Blog({title:"dougie"})
    console.log(blarg)
    blarg.save((err, blarg) => {
        if(err) console.error(err)
        console.log('saved')
    })
    res.send(req.body)
})

module.exports = router