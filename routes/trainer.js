const router = require('express').Router()
const { Trainer } = require('../db/database')

router.get('/', async(req, res, next) =>{
    try{
        res.send(await Trainer.findAll())
    }
    catch(e){
        next(e)
    }
})

module.exports = router