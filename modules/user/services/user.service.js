const UserModel = require('../models/user.model');
const {createToken} = require('../../../utils/utils');
const bcrypt = require("bcrypt");

module.exports = new class UserServices{

        async register(req, res){

                    // Get user input
                const { full_name, username, password } = await req.body;
            
                    // Validate user input
                if (!username) {
                    return res.status(422).json({
                        "message": "username is required!"
                      });
                    }
            
                if (!(password)) {
                      return res.status(422).json({
                        "message": "Password is required!"
                      });
                    }


                const oldUser = await UserModel.findOne({ username });
                
                if (oldUser) {
                      return res.status(409).json({
                        "message": "username already exists!",
                      });
                    }
            
                    //Encrypt user password
                    const encryptedPassword = await bcrypt.hash(password, 10);

                    const user_data = {
                        username, 
                        password: encryptedPassword,
                        
                    }

                    if(full_name != undefined){
                        user_data.full_name = await full_name;
                    }
            
                    // Create user in our database
                    const user = await UserModel.create(user_data);
            
                  
                    const tokens = await createToken(await user._id);
            
                    let data = {
                       _id: user._id,
                       tokens: tokens
                        }
            
                    
                    return await res.status(201).json({
                        "message": `Welcome ${username}`,
                        data
                    });
                }
            

        async login(req, res){
                const {username, password} = req.body;
            
                if (!username){
                    return res.status(422).json({
                        "message": "username is required"
                      });
                }
            
                if (!(password)){
                    return res.status(422).json({
                        "message": "password is required"
                      });
                }
            
                const user = await UserModel.findOne({username});
            
                if (user && await bcrypt.compare(password, user.password)){
                      const token = await createToken(user._id)

                      return await res.status(200).json({
                        message: "welcome back!",
                        data : {
                            userId: user._id,
                            token: token 
                        }
                      })
                }
            
                else{
                    return res.status(404).json({
                        message: "user not found!"
                    })
                }
            
        }


}