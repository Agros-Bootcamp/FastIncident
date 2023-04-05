import {app} from './app.js'
import sqlDB from './database/database.js'
import './model/userProfile.js'

import { tb_rol_user } from './model/userProfile.js'

const create_default_roles = async (title_rol_user) => {
    const [result, created_result] = await tb_rol_user.findOrCreate({
        where: {
            title_rol_user
        }
    })
    if (created_result) return console.log(`Rol de usuario ${title_rol_user} creado`)
    else return console.log()
}

const main = async () => {
    try {
        await sqlDB.authenticate()
        await sqlDB.sync({force:false})
        app.listen(4000)
        console.log('works')

    } catch (error) {
        console.log(error)
    }
}

main()