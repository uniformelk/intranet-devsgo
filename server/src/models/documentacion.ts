import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Cliente, ClienteId } from './client';
import type { Proyecto, ProyectoId } from './proyecto';

export interface DocumentacionAttributes {
  id_documento: number;
  descripcion: string;
  tipo: string;
  url: string;
  id_cliente: number;
  id_proyecto: number;
  usuario_creacion: string;
  fecha_creacion: Date;
  usuario_modificacion: string;
  fecha_modificacion: Date;
  version: number;
}

export type DocumentacionPk = "id_documento";
export type DocumentacionId = Documentacion[DocumentacionPk];
export type DocumentacionOptionalAttributes = "id_documento" | "fecha_creacion" | "fecha_modificacion";
export type DocumentacionCreationAttributes = Optional<DocumentacionAttributes, DocumentacionOptionalAttributes>;

export class Documentacion extends Model<DocumentacionAttributes, DocumentacionCreationAttributes> implements DocumentacionAttributes {
  id_documento!: number;
  descripcion!: string;
  tipo!: string;
  url!: string;
  id_cliente!: number;
  id_proyecto!: number;
  usuario_creacion!: string;
  fecha_creacion!: Date;
  usuario_modificacion!: string;
  fecha_modificacion!: Date;
  version!: number;

  // Documentacion belongsTo Cliente via id_cliente
  id_cliente_cliente!: Cliente;
  getId_cliente_cliente!: Sequelize.BelongsToGetAssociationMixin<Cliente>;
  setId_cliente_cliente!: Sequelize.BelongsToSetAssociationMixin<Cliente, ClienteId>;
  createId_cliente_cliente!: Sequelize.BelongsToCreateAssociationMixin<Cliente>;
  // Documentacion belongsTo Proyecto via id_proyecto
  id_proyecto_proyecto!: Proyecto;
  getId_proyecto_proyecto!: Sequelize.BelongsToGetAssociationMixin<Proyecto>;
  setId_proyecto_proyecto!: Sequelize.BelongsToSetAssociationMixin<Proyecto, ProyectoId>;
  createId_proyecto_proyecto!: Sequelize.BelongsToCreateAssociationMixin<Proyecto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Documentacion {
    return Documentacion.init({
      id_documento: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      descripcion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      url: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id_cliente'
        }
      },
      id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'proyectos',
          key: 'id_proyecto'
        }
      },
      usuario_creacion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp')
      },
      usuario_modificacion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "0000-00-00 00:00:00"
      },
      version: {
        type: DataTypes.DOUBLE(2, 1),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'documentacion',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_documento" },
          ]
        },
        {
          name: "cliente_documento",
          using: "BTREE",
          fields: [
            { name: "id_cliente" },
          ]
        },
        {
          name: "proyecto_documento",
          using: "BTREE",
          fields: [
            { name: "id_proyecto" },
          ]
        },
      ]
    });
  }
}
