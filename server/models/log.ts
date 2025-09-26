import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LogAttributes {
  id: number;
  id_usuario: number;
  fecha_evento: Date;
  tipo_evento: number;
  ip_origen: string;
  navegador: string;
}

export type LogPk = "id";
export type LogId = Log[LogPk];
export type LogOptionalAttributes = "id" | "fecha_evento";
export type LogCreationAttributes = Optional<LogAttributes, LogOptionalAttributes>;

export class Log extends Model<LogAttributes, LogCreationAttributes> implements LogAttributes {
  id!: number;
  id_usuario!: number;
  fecha_evento!: Date;
  tipo_evento!: number;
  ip_origen!: string;
  navegador!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Log {
    return Log.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_evento: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    tipo_evento: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ip_origen: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    navegador: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'logs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
