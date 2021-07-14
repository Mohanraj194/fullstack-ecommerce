import bcryptjs from 'bcryptjs';

const users=[
    {
    name:"admin",
    email:"admin@example.com",
    password: bcryptjs.hashSync('12345678',10),
    isAdmin:true
    },
    {
        name:"mohan",
        email:"mohan@example.com",
        password: bcryptjs.hashSync('12345678',10)
    },
    {
        name:"raj",
        email:"raj@example.com",
        password: bcryptjs.hashSync('12345678',10)
    }
]

export default users