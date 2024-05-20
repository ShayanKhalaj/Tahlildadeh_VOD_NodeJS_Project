import crypto from 'crypto'

const passworGenrator = (password)=>{
    const salt = crypto.randomBytes(32).toString('hex')
    const hash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
    return {
        salt:salt,
        hash:hash
    }
}

const passwordValidator =(password,salt,hash)=>{
    const verifyHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
    return verifyHash === hash
}



export const PassworSetting = {passworGenrator,passwordValidator}