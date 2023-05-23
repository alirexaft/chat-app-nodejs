const UserServices = require('../services/user.service');

module.exports = new class UserController{

        async login(req, res){
                return await UserServices.login(req, res);
        }

        async register(req, res){
                return await UserServices.register(req, res);
        }

}