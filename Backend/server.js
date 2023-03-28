import {app} from './app.js'
import sqlDB from './database/database.js'
import './model/userProfile.js'

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