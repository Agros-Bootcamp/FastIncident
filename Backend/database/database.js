import Sequelize from "sequelize";
import {config} from 'dotenv'

config()

const sqlDB = new Sequelize("express2", "postgres", process.env.PG_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

export default sqlDB