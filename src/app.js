const express = require("express");
const app = express();
const PORT = 3000;
const usersRoutes = require('./routes/usersRoutes.js');
const teachersRoutes = require('./routes/teachersRoutes.js')

app.listen(PORT, ()=>console.log('Escuchando en puerto 3000'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/teachers', teachersRoutes);
