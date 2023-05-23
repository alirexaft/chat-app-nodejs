const jwt = require('jsonwebtoken')


async function createToken(userid){
        console.log("Date.now()", Date.now())
        let accessTokenExpireTime = Number(Date.now()) + (Number(process.env.ACCESS_TOKEN_EXPIRES_TIME) * 1000);
        let refreshTokenExpireTime = Number(Date.now()) + (Number(process.env.REFRESH_TOKEN_EXPIRES_TIME) * 1000);
        
        let tokens = {
            accessToken: await jwt.sign({ id:userid, expiredIn: accessTokenExpireTime }, process.env.ACCESS_TOKEN_SECRET_KEY),
            refreshToken: await jwt.sign({ id: userid, expiredIn: refreshTokenExpireTime }, process.env.REFRESH_TOKEN_SECRET_KEY),
        };
       
        return await tokens;
    
}

module.exports = {
        createToken
}