import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsuarioAttributes {
  id_usuario: number;
  nombres: string;
  apellidos: string;
  password: string;
  estado: number;
  rol: number;
  fecha_creacion: Date;
  usuario_creacion: string;
  fecha_actualizacion?: Date;
  usuario_actualizacion: string;
  usuario: string;
  perfil?: string;
}

export type UsuarioPk = "id_usuario";
export type UsuarioId = Usuario[UsuarioPk];
export type UsuarioOptionalAttributes = "fecha_creacion" | "fecha_actualizacion" | "perfil";
export type UsuarioCreationAttributes = Optional<UsuarioAttributes, UsuarioOptionalAttributes>;

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  id_usuario!: number;
  nombres!: string;
  apellidos!: string;
  password: string;
  estado!: number;
  rol!: number;
  fecha_creacion!: Date;
  usuario_creacion!: string;
  fecha_actualizacion?: Date;
  usuario_actualizacion!: string;
  usuario!: string;
  perfil?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Usuario {
    return Usuario.init({
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nombres: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      apellidos: {
        type: DataTypes.STRING(250),
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
      rol: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp')
      },
      usuario_creacion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: true
      },
      usuario_actualizacion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      usuario: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      perfil: {
        type: DataTypes.STRING(250),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'usuarios',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_usuario" },
          ]
        },
      ]
    });
  }
}
