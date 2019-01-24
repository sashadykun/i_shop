const { users }= require('../../db/models')
const validation = require('../../helpers/validation');
const { tokenForUser, userDataToSend } = require('../../helpers/auth');

module.exports = async (req, res) => {

    const { body: { firstName, lastName, email, password} } = req;
    
    try {

        const errors = [];

        if(!firstName){
            errors.push('Missing first Name')
        }else if (!validation.name(firstName)){
            errors.push('First name can only contain a-z, no special characters allowed');
        }

        if(!lastName){
            errors.push('Missing last Name')
        }else if (!validation.name(lastName)){
            errors.push('Last name can only contain a-z, no special characters allowed');
        }
        if(!email){
            errors.push('Missing email address')
        }else if(!validation.email(email)){
            errors.push('Invalid email address given. Must be ...')
        }
        if(!password){
            errors.push('Missing password');
        } else if(!validation.password(password)){
            errors.push('Invalid password. Must contain upper and lower case letters, number, special character')
        }

        if(errors.length){
            return res.status(422).send({
                success: false,
                errors
            });
        }

        console.log('MADE IT HERE!');

        const existingUser = await users.findOne({
            where: {
                email: email
            }
        })

        if (existingUser){
            return res.status(422).send('User already exists');
        }

        const newUser = users.build({
            email,
            firstName,
            lastName,
            password
        });

        await newUser.save();
        
        res.send({
            success: true,
            token: tokenForUser(newUser),
            user: userDataToSend(newUser)
        })
    } catch(err){
        console.log('Sign Up Error:', err);

        res.status(500).send('Sign Up Failed')
    }
}