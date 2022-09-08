const client = require('../../index');

const getProductOrder = async (req, resp) => {

    const id_usuario = parseInt(req.params.id);
    const date = req.params.date;

    await client.query(`SELECT id, data_pedido, preco_total, status_pedido  FROM  pedido  WHERE id_usuario=$1 AND data_pedido=$2 order by id`,
        [id_usuario, date],
        (err, results) => {

            if (err) {
                resp.status(400).send(err);

            } else if (results.rowCount == 0) {
                resp.status(200).json({
                    message: "There is no registered product orders"
                });

            } else {
                resp.status(200).json(results.rows);
            }

        });
}

const getOrderDetails = async (req, resp) => {

    const id_usuario = parseInt(req.params.id);
    const id_pedido = parseInt(req.params.pedido);

    console.log(id_usuario, id_pedido);

    await client.query(`SELECT SUM(quantidade)              as itens,
                               id,
                               status_pedido,
                               img,
                               nome,
                               preco_produto,
                               quantidade,
                               tipo_pagamento,
                               endereco,
                               troco,
                               (preco_produto * quantidade) as subtotal
                        FROM (SELECT p.id,
                                     p.status_pedido,
                                     prd.img,
                                     prd.nome,
                                     (pp.preco_produto * pp.quantidade)                   as preco_produto,
                                     pp.quantidade,
                                     p.tipo_pagamento,
                                     endr.numero || '-' || endr.rua || '-' || endr.bairro as endereco,
                                     p.troco
                              FROM pedido p,
                                   produto prd,
                                   produtos_pedido pp,
                                   endereco endr
                              WHERE p.id = pp.id_pedido
                                AND prd.id = pp.id_produto
                                AND endr.id_usuario = pp.id_usuario
                                AND pp.id_usuario = $1
                                AND p.id = $2
                             ) as tb
                        GROUP BY id,
                                 status_pedido,
                                 img,
                                 nome,
                                 preco_produto,
                                 quantidade,
                                 tipo_pagamento,
                                 endereco,
                                 troco,
                                 (preco_produto * quantidade) 
        `,
        [id_usuario, id_pedido],
        (err, results) => {

            if (err) {
                resp.status(400).send(err);

            } else if (results.rowCount == 0) {
                resp.status(200).json({
                    message: "There is no registered product orders"
                });

            } else {
                resp.status(200).json(results.rows);
            }
        });
}

const getProductBag = async (req, resp) => {

    const id_usuario = parseInt(req.params.id);

    await client.query(`SELECT 
                            id,
                            img,
                            nome,
                            preco,
                            quantidade,
                            (preco * quantidade) as preco_total
                        FROM (
                            SELECT 
                               prd.id,
                               prd.img,
                               prd.nome,
                               prd.preco,
                               s.quantidade
                             FROM sacola s,
                               produto prd
                             WHERE s.id_produto = prd.id
                             AND s.id_usuario = $1
                        ) as tb`,
        [id_usuario],
        (err, results) => {

            if (err) {
                resp.status(400).send(err);

            } else if (results.rowCount == 0) {
                resp.status(200).json({
                    message: "There is no registered product orders"
                });

            } else {
                resp.status(200).json(results.rows);
            }

        });
}

const createSacola = async (req, resp) => {
    const {
        id_produto,
        id_usuario,
        quantidade,

    } = req.body;

    await client.query(`INSERT INTO sacola(id_produto, id_usuario, quantidade)
        VALUES ( ${id_produto}, ${id_usuario}, ${quantidade})`, (err, results) => {
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

module.exports = {
    getProductOrder,
    getOrderDetails,
    getProductBag,
    createSacola
}
