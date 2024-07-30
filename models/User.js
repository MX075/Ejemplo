const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,

        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'usuario', 'cliente'], // Define los roles posibles
        default: 'cliente' // Asigna un rol por defecto si no se especifica
    }
}, { timestamps: true });


// aca encriptamos las password antes de guardar en la db
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

// export modelo
const User = mongoose.model('User', userSchema);

module.exports = User;