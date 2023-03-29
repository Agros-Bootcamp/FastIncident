import { DataTypes } from 'sequelize'
import sqlDB from '../database/database.js'

//Tabla usuarios: Estos contaran con un rol para que pueda acceder a las paginas segun los permisos que tenga
export const tb_user = sqlDB.define('tb_user', {
    pk_id_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    first_name_user: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    last_name_user: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email_user: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        unique: true,
        allowNull: false
    },
    password_user: {
        type: DataTypes.STRING
    },

    balance_token: {
        type: DataTypes.INTEGER
    }
})

//Tabla de rol usuario
export const tb_rol_user = sqlDB.define('tb_rol_user', {
    pk_id_rol_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title_rol_user: {
        type: DataTypes.STRING
    },
    description_rol_user: {
        type: DataTypes.STRING
    }
})

//Tabla de tareas
export const tb_task = sqlDB.define('tb_task', {
    pk_id_task: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title_task: {
        type: DataTypes.STRING
    },
    description_task: {
        type: DataTypes.STRING
    },
    status_task: {
        type: DataTypes.STRING
    },
    start_date_task: {
        type: DataTypes.DATE
    },
    end_date_task: {
        type: DataTypes.DATE
    },
    priority_task: {
        type: DataTypes.STRING
    },
    reward_task: {
        type: DataTypes.INTEGER
    },
    limit_incidents: {
        type: DataTypes.INTEGER
    }
})

//Tabla de incidentes
export const tb_incident = sqlDB.define('tb_incident', {
    pk_id_incident: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    description_incident: {
        type: DataTypes.STRING
    },
    start_date_incident: {
        type: DataTypes.DATE
    },
    end_date_incident: {
        type: DataTypes.DATE
    },
    status_incident: {
        type: DataTypes.BOOLEAN
    }
})




export const tb_type_incident = sqlDB.define('tb_type_incident', {
    pk_id_type_incident: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title_type_incident: {
        type: DataTypes.STRING
    },
    description_type_incident: {
        type: DataTypes.STRING
    },
    penalty_incident: {
        type: DataTypes.INTEGER
    },
    returned_tokens: {
        type: DataTypes.INTEGER
    }
})

tb_user.hasMany(tb_task, {
    foreignKey: {
        name: 'fk_id_user',
        allowNull: false
    }
});

tb_rol_user.hasMany(tb_user, {
    foreignKey: {
        name: 'fk_id_rol_user',
        allowNull: false
    }
});

tb_user.belongsTo(tb_rol_user, {
    foreignKey: {
        name: 'fk_id_rol_user',
        allowNull: false
    }
});

tb_task.belongsTo(tb_user, {
    foreignKey: {
        name: 'fk_id_user',
        allowNull: false
    }
});

tb_task.hasMany(tb_incident, {
    foreignKey: {
        name: 'fk_id_task',
        allowNull: false
    }
});

tb_incident.belongsTo(tb_task, {
    foreignKey: {
        name: 'fk_id_task',
        allowNull: false
    }
});

tb_type_incident.hasMany(tb_incident, {
    foreignKey: {
        name: 'fk_id_type_incident',
        allowNull: false
    }
});

tb_incident.belongsTo(tb_type_incident, {
    foreignKey: {
        name: 'fk_id_type_incident',
        allowNull: false
    }
});