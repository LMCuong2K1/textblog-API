const Joi = require('joi');

    const registerSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    const validateRegister = (req,res,next)=>{
        const {error} = registerSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                error:error.details[0].message
            });
        }
        next();
    }
    module.exports = {validateRegister};