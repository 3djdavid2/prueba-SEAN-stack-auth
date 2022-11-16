const bcrypt= require('bcrypt');

const encriptarPass = async(passwordPlain)=>{
    const hashPassword= await bcrypt.hash(passwordPlain,10)
    return hashPassword
}

const compararPass = async (passwordPlain, hashPassword)=>{
    return await bcrypt.compare(passwordPlain, hashPassword)
}

// encriptarPass('Gerencia@xxxx')
// .then((res)=>{
//     console.log(res)
// })

module.exports= {encriptarPass, compararPass};