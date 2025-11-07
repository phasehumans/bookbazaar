const {UserModel} = require('../model/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address
    const role = req.body.role

    if(!firstName || !lastName || !email || !password || !role){
        res.json({
            message : "all fields are required"
        })
        return
    }

    try {
        const hashPassword = await bcrypt.hash(password, 5)
        await UserModel.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            address : address,
            role : role,
            password : hashPassword
        })

        res.json({
            message : "sign-up completed"
        })
    } catch (error) {
        res.json({
            message : "sign-up failed"
        })
    }

}

const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    
    if(!email || !password){
        res.json({
            message : "all fields are required"
        })
    }

    const user = UserModel.find({
        email : email
    })

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(passwordMatch){
        const token = jwt.sign(user.id, process.env.JWT_SECRET)
        res.json({
            message : "logged in",
            token : token
        })
    }else{
        res.json({
            message : "logged in failed"
        })
    }
}



module.exports = {
    registerUser : registerUser,
    loginUser : loginUser
}