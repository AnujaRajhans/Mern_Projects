const jwt = require('jsonwebtoken');
const authorise= (req,res,next)=>{
    const token = req.header('Authorization');
    const bearerWord = token.split(' ')[0].trim();
    const bearerToken = token.split(' ')[1];
    if(bearerWord!= "Bearer")
        return res.status(401).send({message: 'Invalid token'});
    if(!bearerToken)
        return res.status(401).send({message: 'Token not provided'});
    try{
        const decode = jwt.verify(bearerToken,"key");
        req.user = decode.userId;
        next();
    }
    catch(err){
        return res.status(400).send({message: 'Token invalid'});
    }
}
module.exports = authorise;
