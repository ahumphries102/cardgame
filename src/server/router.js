const express = require('express')
const Kitten = require('./schema')
const router = express.Router()

router.post('/hotdog', (req, res)=>{
    console.log(req.body)
    res.send({username:'dug'})
})

router.get('/hotdog2', (req, res)=>{
    res.send({username:'dug2'})
})

router.post('/hotdog3', (req, res)=>{
    // const blarg = new Kitten({name:req.body})
    console.log(req.body)
    // blarg.save((err, blarg) => {
    //     if(err) console.error(err)
    //     console.log('saved')
    // })
    res.send({dog: req.body})
})

module.exports = router