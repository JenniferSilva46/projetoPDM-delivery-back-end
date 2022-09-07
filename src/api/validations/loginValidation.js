const yup = require('yup');

const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email cannot be null!'),
    senha: yup.string().min(8, 'Invalid password').required('Password cannot be null!'),
});

module.exports = loginSchema;