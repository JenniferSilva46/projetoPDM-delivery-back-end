const yup = require('yup');

const bagSchema = yup.object({
    id_produto: yup.number.required('Id product cannot be null!'),
    id_usuario: yup.number.required('Id user cannot be null!'),
    quantidade: yup.number.required('Quantity cannot be null!'),
});

module.exports = bagSchema;