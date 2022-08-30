const client = require('../../index');

const createOrdered = async (req, resp) => {
    const {
        id_usuario,
        id_endereco,
        pagamento,
        data_pedido,
        subtotal,
    } = req.body;

    await client.query(`INSERT INTO pedido ( id_usuario, id_endereco, pagamento, data_pedido, subtotal)
        VALUES ('${id_usuario}', '${id_endereco}', '${pagamentopagamentota_pedido}', '${subtotal}')`, (err, results) => {
        if (err) {
            resp.status(400).send(err);
            console.log(err);
            return;
        }
        resp.status(200).send({
            message: "Inserted"
        });
    });

}

const getOrdered = async (req, resp) => {
    const {
        id_usuario,
        data_pedido,
    } = req.body;

    await client.query('SELECT * FROM pedido WHERE id_usuario = $1 AND data_pedido = $2',
        [id_usuario, data_pedido],
        (err, results) => {

            if (err) {
                resp.status(400).send(err);

            } else if (results.rowCount == 0) {
                resp.status(200).json({
                    message: "There is no registered user"
                });

            } else {
                resp.status(200).json(results.rows);
            }

        });
}

module.exports = {
    createOrdered,
    getOrdered,
}