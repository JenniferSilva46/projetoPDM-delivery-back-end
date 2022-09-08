const client = require('../../index');

const getAllProducts = async (req, resp) => {

    await client.query(`SELECT * FROM produto`,
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

const getProduct= async (req, resp) => {
    const id = parseInt(req.params.id);
    console.log("id")

    await client.query('SELECT id,nome, img,preco, descricao FROM produto WHERE id = $1',
        [id],
        (err, results) => {

            if (err) {
                resp.status(400).send(err);

            } else if (results.rowCount == 0) {
                resp.status(200).json({
                    message: "There is no registered product"
                });

            } else {
                resp.status(200).json(results.rows);
            }

        });
}

module.exports = {
    getAllProducts,
    getProduct
}