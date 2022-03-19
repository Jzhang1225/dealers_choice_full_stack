const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed } = require('./db/database')

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/api/pokemons', require('./routes/pokemon'));
app.use('/api/trainers', require('./routes/trainer'));


app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


const init = async () =>{
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init()