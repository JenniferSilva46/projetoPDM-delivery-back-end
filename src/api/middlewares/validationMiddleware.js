const validation = (schema) => async (req, res, next) =>  {
    const body = req.body;

    try{
        await schema.validate(body);
        next();
    }catch(e){
        return res.status(400).json({e})
    }
}

module.exports = validation;