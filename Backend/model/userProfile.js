import { DataTypes } from 'sequelize'
import sqlDB from '../database/database.js'

export const userProfile = sqlDB.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        unique: true,
        allowNull: false
    },
    rol : {
        type: DataTypes.STRING
    }
    ,password: {
        type: DataTypes.STRING
    },
    //Tareas relacionadas con el modelo de tareas
    tareas : {
        type:DataTypes.ARRAY
    },
    incidencias : {
        type: DataTypes.ARRAY
    },
    //
    balanceToken : {
        type : DataTypes.INTEGER
    }
})

export const Tareas = sqlDB.define('tareas', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    titulo : {
        type: DataTypes.STRING
    },
    descripcion : {
        type : DataTypes.STRING
    },
    status : {
        type: DataTypes.STRING
    },
    fechaDeInicio : {
        type : DataTypes.DATE
    },
    fechaLimite : {
        type : DataTypes.DATE
    },
    prioridad : {
        type: DataTypes.STRING
    },
    recompensa : {
        type : DataTypes.INTEGER
    },
    limiteIncidencias : {
        type : DataTypes.INTEGER
    }
})

export const incident = sqlDB.define('incidents', {
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    descripcion : {
        type: DataTypes.STRING
    },
    fechaInicioIncidencia : {
        type : DataTypes.DATE
    },
    fechaResuelta : {
        type: DataTypes.DATE
    },
    resulta : {
        type : DataTypes.BOOLEAN
    }
})

export const tipoIncidencia = sqlDB.define('tipoIncidencia', {
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    tipo: {
        type : DataTypes.STRING
    },
    penalidad: {
        type : DataTypes.INTEGER
    },
    tokensDevueltos : {
        type : DataTypes.INTEGER
    }
})