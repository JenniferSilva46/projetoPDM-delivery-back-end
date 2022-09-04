    const client = require('../../index');
    const jwt = require('jsonwebtoken');

    const authConfig = require('../../config/auth.json');

    const createUser = async (req, resp) =>{
        const {
            nome,
            email,
            senha
        } = req.body;

        await client.query(`INSERT INTO usuario (nome, email, senha)
        VALUES ('${nome}', '${email}', '${senha}')`, (err, results) => {
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

    const getUser= async (req, resp) => {
        const id = parseInt(req.params.id);
        console.log("id")

        await client.query('SELECT id,nome, email,img FROM usuario WHERE id = $1',
            [id],
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

    const getAllUsers = async (req, resp) => {

        await client.query(`SELECT id,nome, email, img FROM usuario`,
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

    const updateUser = async (req, resp) => {

        const {
            id,
            nome,
        } = req.body;

        await client.query('UPDATE usuario SET nome = $2 WHERE id= $1',
            [id, nome],
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
    };

    const deleteUser = async (req, resp) => {

        const id = req.params.id;
        await client.query(`DELETE FROM usuario WHERE id = $1`, [id], (err, results) => {
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

    const auth = async (req, resp) => {
        const {email, senha} = req.body;
        
        await client.query(`SELECT id,email,nome,img,senha FROM usuario WHERE email = $1`, [email],
            (err, results) => {

            if (err) {
                resp.status(400).send(err);

            } else if (results.rowCount == 0) {
                resp.status(404).json({
                    message: "There is no registered user"
                });

            } else {
                if(results.rows[0]){
                    const {id, nome, img} = results.rows[0];
                    const userEmail = results.rows[0].email;
                    const userPassword = results.rows[0].senha;

                    if(userEmail === email && userPassword === senha){
                        const token = jwt.sign({id}, authConfig.secret, {
                            expiresIn: 86400,
                        });
                        resp.status(200).json({
                            user: {
                                id,
                                email: userEmail,
                                nome,
                                img,
                            },
                            token
                        });
                    }else{
                        resp.status(400).json('Incorrect username or password')
                    }
                }
            }

        });
        
    }

    module.exports = {
        createUser,
        getUser,
        updateUser,
        deleteUser,
        getAllUsers,
        auth
    }