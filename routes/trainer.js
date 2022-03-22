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

router.post('/', async(req, res, next) =>{
    try{
        const trainer = await Trainer.create({ name: req.body.name, age: req.body.age })
        res.send(trainer)
    }
    catch(e){
        next(e)
    }
})

router.put('/:id', async(req, res, next) =>{
    try{
        const trainer = await Trainer.findByPk(req.params.id);
        await trainer.set({
            name: req.body.name,
            age: req.body.age
        });
        res.send(trainer)
    }
    catch(e){
        next(e)
    }
})

router.delete('/:id', async(req, res, next) =>{
    try{
        const trainer = await Trainer.findByPk(req.params.id);
        await trainer.destroy();
        res.send(trainer)
    }
    catch(e){
        next(e)
    }
})

module.exports = router