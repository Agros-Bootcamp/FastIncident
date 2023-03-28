import  Sequelize  from "sequelize";

const sqlDB = new Sequelize("express2","postgres",process.env.PG_PASSWORD,{
    host: 'localhost',
    dialect: 'postgres'
})

export default sqlDB