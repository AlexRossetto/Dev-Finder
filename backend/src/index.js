const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-hv4xm.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de paramêtros:
//Query Params: GET req.query(Filtros, Ordenação, Paginação, ...)
//Route Params: PUT / DELETE req.params(Identificar recurso na alteração ou remoção)
//Body Params:  POST / PUT req.body(Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional)

app.listen(3333);

