const yup = require('yup');

const userSchema = yup.object({
    nome: yup.string().min(3, 'Invalid name').required('Name cannot be null!'),
    email: yup.string().email('Invalid email').required('Email cannot be null!'),
    senha: yup.string().min(8, 'Invalid password').required('Password cannot be null!'),
    img: yup.string(),
});

module.exports = userSchema;