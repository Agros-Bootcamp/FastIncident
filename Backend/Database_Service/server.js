import sqlDB from "../database/database.js"
import { app } from "./app.js"

const main = async () => {
    try {
        await sqlDB.authenticate()
        await sqlDB.sync({force: false})
        app.listen(4001)
        console.log('works')
    } catch (error) {
        console.log(error)
    }
}

main()