const jwt = require('jsonwebtoken');
const userModel = require('../modules/user/models/user.model');


module.exports = async function(request , response , next) {
        
        const token = request.headers['authorization'];
        
        if(!token){
            return response.status(403).json({message: 'You dont have access!'})
        }
        
        if(token.split(' ')[0] !== 'Bearer') {
                return response.status(401).json({message: 'Token invalid or expired!'});
        }
        
        let accessToken = token.split(' ')[1];
                
        if(accessToken) {
            return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, async(error, decode) => {
                if (error) {
                        return response.status(401).json({message: 'Token invalid or expired!'});
                }

                else {
                       
                    if(Number(decode.expiredIn)<Number(Date.now())){
                        return response.status(401).json({message: 'Token invalid or expired!'});
                    } 
                    
                    else{

                        const user = await userModel.findById(decode.id);

                        if(!user){
                                return response.status(401).json({message: 'Token invalid or expired!'});
                        }

                        request.user = await user;

                        }
                        
                    }
                    return next();
                });
            } 
            
            else{
                return response.status(403).json({"message": 'You dont have access'})
                }
    
        
       

}