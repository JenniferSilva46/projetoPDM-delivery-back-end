const client = require('../../index');
const jwt = require('jsonwebtoken');

const createAdress = async (req, resp) => {
    const {
        id_usuario,
        rua,
        numero,
        bairro,
        cidade,
        complemento,
        lat,
        lng
    } = req.body;

    await client.query(`INSERT INTO endereco (id_usuario, rua, numero, bairro, cidade, complemento, marker) 
        VALUES ( ${id_usuario},'${rua}', ${numero},'${bairro}','${cidade}','${complemento}',
        ST_GeomFromText('POINT(${lat} ${lng})') )`, (err, results) => {
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

const getAdress = async (req, resp) => {
    const id_usuario = parseInt(req.params.id);

    await client.query('SELECT id_usuario, rua, numero, bairro, cidade, complemento, ST_x(marker), ST_y(marker) FROM endereco WHERE id_usuario = $1',
        [id_usuario],
        (err, results) => {

            if (err) {
                resp.status(400).send(err);

            } else if (results.rowCount == 0) {
                resp.status(200).json({
                    message: "There is no registered Adress"
                });

            } else {
                resp.status(200).json(results.rows);
            }

        });
}

const updateAdress = async (req, resp) => {
    const {
        id,
        rua,
        numero,
        bairro,
        cidade,
        complemento,
        lat,
        lng
    } = req.body;
    console.log(id,
        rua,
        numero,
        bairro,
        cidade,
        complemento,
        lat,
        lng
        )
  


    await client.query( `UPDATE endereco SET rua='${rua}', numero=${numero}, bairro='${bairro}', cidade='${cidade}', complemento= '${complemento}', marker=ST_GeomFromText('POINT(${lat} ${lng})')
    WHERE id= ${id}`,
        (err, results) => {

            if (err) {
                resp.status(400).send(err);


            } else if (results.rowCount == 0) {
                resp.status(200).json({
                    message: "There is no registered Andress"
                });

            } else {
                resp.status(200).json(results.rows);
            }

        });
};


const deleteAdress = async (req, resp) => {

    const id = req.params.id;

    await client.query(`DELETE FROM endereco WHERE id = $1`, [id], (err, results) => {
        if (err) {
            resp.status(400).send(err);

        } else if (results.rowCount == 0) {
            resp.status(400).send({
                message: 'Informed does not exist'
            });

        } else {
            resp.status(200).send({
                message: 'User deleted!'
            });
        }

    });
}

module.exports = {
    createAdress,
    getAdress,
    updateAdress,
    deleteAdress
}