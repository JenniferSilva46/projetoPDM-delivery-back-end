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

module.exports = {
    getAllProducts
}