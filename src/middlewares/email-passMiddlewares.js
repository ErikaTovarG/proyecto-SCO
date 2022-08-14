module.exports = (req, res, next) => {
    if(req.body.email && req.body.password){
        next()
    }else{
        res.status(500).json({
            message: 'Parametro del body incompleto'
        })
    }
}
