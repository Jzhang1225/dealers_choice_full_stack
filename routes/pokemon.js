const router = require('express').Router()
const { Pokemon } = require('../db/database')

router.get('/', async(req, res, next) =>{
    try{
        res.send(await Pokemon.findAll())
    }
    catch(e){
        next(e)
    }
})

module.exports = router