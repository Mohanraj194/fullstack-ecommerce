import jwt from 'jsonwebtoken'

const generateToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_JWT_TOKEN,{
        expiresIn:'30d'
    })
}

export default generateToken