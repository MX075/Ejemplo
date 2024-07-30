const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Users = require('./models/User')
mongoose.connect('mongodb://127.0.0.1:27017/qwe')
    .then(() => console.log('Base de datos Conectada'))
    .catch(err => console.log("base de datos error:", err))

// Usuario por defecto a crear
const defaultUser = {
    username: 'admin',
    email: 'admin@example.com',
    rol: 'admin',
    password: 'admin',

}

// Función para crear el usuario por defecto si no existe, si existe no lo creo obviamente 
const createDefaultUser = async() => {
    try {
        // Verifica si el usuario ya existe
        const userExists = await Users.findOne({ username: defaultUser.username })

        if (!userExists) {
            // Encripta la contraseña
            const hashedPassword = await bcrypt.hash(defaultUser.password, 10); // El segundo argumento es el número de rondas de saltos entre mas saltos mas brigida la wea

            // Crea un nuevo usuario con la contraseña hasheada asi no te hackean o si pero no sabe la pass jja

            const newUser = new Users({
                ...defaultUser,
                password: hashedPassword,
            });

            await newUser.save();
            console.log('Usuario por defecto creado:', newUser);
        } else {
            console.log('El usuario por defecto ya existe.');
        }
    } catch (error) {
        console.error('Error al crear el usuario por defecto:', error);
    }
};

// Llama a la función al iniciar la aplicación osea si el user se elimina por x situacion reinicia el server y se vuelve a crear
createDefaultUser();