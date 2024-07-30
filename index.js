const express = require('express')

require('./database')

const app = express()
const port = 3010

// esto es para poder leer los Json y ver los datos mas que nada
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// aca declaramos el motor de plantillas en este caso EJS
app.set('view engine', 'ejs');
app.set('Views', __dirname + '/views');

// mandamos una carpeta a frontEnd en este caso public 'css,js,assets'
app.use(express.static(__dirname + "/public"));

// llamamos a las rutas osea cuando el user haga ingreso a la ruta / lo enviara al archivo indicado
app.use("/", require("./routers/RouterInicial"));
//aca es donde corre el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})