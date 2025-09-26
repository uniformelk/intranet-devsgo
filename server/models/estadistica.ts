import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Cliente, ClienteId } from './cliente';
import type { Proyecto, ProyectoId } from './proyecto';

export interface EstadisticaAttributes {
  id_registro: number;
  id_proyecto: number;
  id_cliente: number;
  base_datos: string;
  tabla: string;
  usuario: string;
  password: string;
  servidor: string;
}

export type EstadisticaPk = "id_registro";
export type EstadisticaId = Estadistica[EstadisticaPk];
export type EstadisticaOptionalAttributes = "id_registro";
export type EstadisticaCreationAttributes = Optional<EstadisticaAttributes, EstadisticaOptionalAttributes>;

export class Estadistica extends Model<EstadisticaAttributes, EstadisticaCreationAttributes> implements EstadisticaAttributes {
  id_registro!: number;
  id_proyecto!: number;
  id_cliente!: number;
  base_datos!: string;
  tabla!: string;
  usuario!: string;
  password!: string;
  servidor!: string;

  // Estadistica belongsTo Cliente via id_cliente
  id_cliente_cliente!: Cliente;
  getId_cliente_cliente!: Sequelize.BelongsToGetAssociationMixin<Cliente>;
  setId_cliente_cliente!: Sequelize.BelongsToSetAssociationMixin<Cliente, ClienteId>;
  createId_cliente_cliente!: Sequelize.BelongsToCreateAssociationMixin<Cliente>;
  // Estadistica belongsTo Proyecto via id_proyecto
  id_proyecto_proyecto!: Proyecto;
  getId_proyecto_proyecto!: Sequelize.BelongsToGetAssociationMixin<Proyecto>;
  setId_proyecto_proyecto!: Sequelize.BelongsToSetAssociationMixin<Proyecto, ProyectoId>;
  createId_proyecto_proyecto!: Sequelize.BelongsToCreateAssociationMixin<Proyecto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Estadistica {
    return Estadistica.init({
    id_registro: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proyectos',
        key: 'id_proyecto'
      }
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id_cliente'
      }
    },
    base_datos: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    tabla: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    servidor: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'estadisticas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_registro" },
        ]
      },
      {
        name: "cliente",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
      {
        name: "proyec",
        using: "BTREE",
        fields: [
          { name: "id_proyecto" },
        ]
      },
    ]
  });
  }
}
