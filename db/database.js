const Sequelize = require('sequelize');
const { STRING, INTEGER, UUID, UUIDV4 } = Sequelize;
const database = new Sequelize(process.env.DATABASE_URL || 'postgres:localhost/dealers_choice_full_stack', { logging:false });

const randomNum = () => Math.ceil(Math.random()*100)
const Trainer = database.define('trainer', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    age: {
        type: INTEGER,
        allowNull: false
    },
})

Trainer.createTrainer = function (name) {
    return this.create({
        name,
        age: randomNum()
    })
}

const Pokemon = database.define('pokemon', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
    },
    level: {
        type: INTEGER,
        allowNull: false,
    },
});

Pokemon.createPokemon = function (name, trainerId) {
    return this.create({
        name,
        level: randomNum(),
        trainerId
    })
}

Trainer.hasMany(Pokemon)
Pokemon.belongsTo(Trainer)

const syncAndSeed = async () =>{
    await database.sync({ force:true })
    console.log('DB CONNECTED')
    const [Ash, Brock, Misty] = await Promise.all(['Ash', 'Brock', 'Misty'].map(x=>{
        return Trainer.createTrainer(x)
    }))
    await Promise.all(['Pikachu', 'Squirtle', 'Bulbasaur'].map(x=> Pokemon.createPokemon(x, Ash.id)));
    await Promise.all(['Charmander', 'Eevee'].map(x=> Pokemon.createPokemon(x, Misty.id)))
};

module.exports = {
    database,
    syncAndSeed,
    Pokemon,
    Trainer,
};