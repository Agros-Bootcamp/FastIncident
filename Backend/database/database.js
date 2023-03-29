import Sequelize from "sequelize";

const sqlDB = new Sequelize("express2", "postgres", "admin", {
    host: 'localhost',
    dialect: 'postgres'
})

export default sqlDB