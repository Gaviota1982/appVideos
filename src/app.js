const express = require('express');
const req = require('express/lib/request');
const program = express();
const path = require('path');
const morgan = require('morgan');

//configuración server
program.set('port', 5000)
program.set('views', path.join(__dirname, 'views'));
program.set('view engine', 'ejs');

// lógica de intercambio de información o middlewares
program.use(morgan('dev'));
program.use(express.urlencoded({extended: false}));

//routes
program.use(require('./routes/index'));

//archivos estáticos o públicos
program.use(express.static(path.join(__dirname,'pablic')));

//Respuesta 404 handler
program.use((req, res, next) =>{
    res.status(404).send('404 No funciona');
})

module.exports = program;