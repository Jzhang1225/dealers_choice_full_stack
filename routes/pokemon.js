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

router.post('/', async(req, res, next) =>{
    try{
        const pokemon = await Pokemon.create({ name: req.body.name, level: req.body.level, trainerId: req.body.trainerId })
        res.send(pokemon)
    }
    catch(e){
        next(e)
    }
})

router.delete('/:id', async(req, res, next) =>{
    try{
        const pokemon = await Pokemon.findByPk(req.params.id);
        await pokemon.destroy();
        res.send(pokemon)
    }
    catch(e){
        next(e)
    }
})

module.exports = router