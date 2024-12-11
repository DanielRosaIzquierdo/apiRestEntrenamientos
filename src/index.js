const express = require('express')
const bodyParser = require('body-parser');
const apicache = require('apicache');
const v1Router = require('./v1/routes/workout_routes')

const app = express();
const port = process.env.PORT || 3000;

// app.get('/', (req, res) =>{
//     res.send('<h1>Servidor básico funcionando a tope</h1>')
// } )
app.use(bodyParser.json());
app.use('/api/v1/workouts', v1Router);

app.listen(port, () => {
    console.log(`API is listening on port ${port}!`)
})

module.exports = {
    apicache,
}
