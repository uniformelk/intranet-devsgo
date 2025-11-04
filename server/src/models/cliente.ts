import { DataTypes, Model, Sequelize } from 'sequelize';
import { db } from '../config/db';
// import Documentacion from './documentacion';
// import Estadistica from './estadistica';
// import Proyecto from './proyecto';

class Cliente extends Model {
    declare id_cliente: number;
    declare nombre_cliente: string;
    declare password: string;
    declare estado: number;
    declare readonly fecha_creacion: Date;
    declare usuario_creacion: string;
    declare fecha_actualizacion: Date | null;
    declare usuario_actualizacion: string | null;
}

Cliente.init({
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nombre_cliente: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    usuario_creacion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    usuario_actualizacion: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    sequelize: db,
    modelName: 'Cliente',
    tableName: 'clientes',
    timestamps: false
});

// Associations
// Cliente.hasMany(Documentacion, { foreignKey: 'id_cliente', as: 'documentacions' });
// Cliente.hasMany(Estadistica, { foreignKey: 'id_cliente', as: 'estadisticas' });
// Cliente.hasMany(Proyecto, { foreignKey: 'id_cliente', as: 'proyectos' });

export default Cliente;
