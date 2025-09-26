import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Documentacion, DocumentacionId } from './documentacion';
import type { Estadistica, EstadisticaId } from './estadistica';
import type { Proyecto, ProyectoId } from './proyecto';

export interface ClienteAttributes {
  id_cliente: number;
  nombre_cliente: string;
  password: string;
  estado: number;
  fecha_creacion: Date;
  usuario_creacion: string;
  fecha_actualizacion?: Date;
  usuario_actualizacion?: string;
}

export type ClientePk = "id_cliente";
export type ClienteId = Cliente[ClientePk];
export type ClienteOptionalAttributes = "fecha_creacion" | "fecha_actualizacion" | "usuario_actualizacion";
export type ClienteCreationAttributes = Optional<ClienteAttributes, ClienteOptionalAttributes>;

export class Cliente extends Model<ClienteAttributes, ClienteCreationAttributes> implements ClienteAttributes {
  id_cliente!: number;
  nombre_cliente!: string;
  password!: string;
  estado!: number;
  fecha_creacion!: Date;
  usuario_creacion!: string;
  fecha_actualizacion?: Date;
  usuario_actualizacion?: string;

  // Cliente hasMany Documentacion via id_cliente
  documentacions!: Documentacion[];
  getDocumentacions!: Sequelize.HasManyGetAssociationsMixin<Documentacion>;
  setDocumentacions!: Sequelize.HasManySetAssociationsMixin<Documentacion, DocumentacionId>;
  addDocumentacion!: Sequelize.HasManyAddAssociationMixin<Documentacion, DocumentacionId>;
  addDocumentacions!: Sequelize.HasManyAddAssociationsMixin<Documentacion, DocumentacionId>;
  createDocumentacion!: Sequelize.HasManyCreateAssociationMixin<Documentacion>;
  removeDocumentacion!: Sequelize.HasManyRemoveAssociationMixin<Documentacion, DocumentacionId>;
  removeDocumentacions!: Sequelize.HasManyRemoveAssociationsMixin<Documentacion, DocumentacionId>;
  hasDocumentacion!: Sequelize.HasManyHasAssociationMixin<Documentacion, DocumentacionId>;
  hasDocumentacions!: Sequelize.HasManyHasAssociationsMixin<Documentacion, DocumentacionId>;
  countDocumentacions!: Sequelize.HasManyCountAssociationsMixin;
  // Cliente hasMany Estadistica via id_cliente
  estadisticas!: Estadistica[];
  getEstadisticas!: Sequelize.HasManyGetAssociationsMixin<Estadistica>;
  setEstadisticas!: Sequelize.HasManySetAssociationsMixin<Estadistica, EstadisticaId>;
  addEstadistica!: Sequelize.HasManyAddAssociationMixin<Estadistica, EstadisticaId>;
  addEstadisticas!: Sequelize.HasManyAddAssociationsMixin<Estadistica, EstadisticaId>;
  createEstadistica!: Sequelize.HasManyCreateAssociationMixin<Estadistica>;
  removeEstadistica!: Sequelize.HasManyRemoveAssociationMixin<Estadistica, EstadisticaId>;
  removeEstadisticas!: Sequelize.HasManyRemoveAssociationsMixin<Estadistica, EstadisticaId>;
  hasEstadistica!: Sequelize.HasManyHasAssociationMixin<Estadistica, EstadisticaId>;
  hasEstadisticas!: Sequelize.HasManyHasAssociationsMixin<Estadistica, EstadisticaId>;
  countEstadisticas!: Sequelize.HasManyCountAssociationsMixin;
  // Cliente hasMany Proyecto via id_cliente
  proyectos!: Proyecto[];
  getProyectos!: Sequelize.HasManyGetAssociationsMixin<Proyecto>;
  setProyectos!: Sequelize.HasManySetAssociationsMixin<Proyecto, ProyectoId>;
  addProyecto!: Sequelize.HasManyAddAssociationMixin<Proyecto, ProyectoId>;
  addProyectos!: Sequelize.HasManyAddAssociationsMixin<Proyecto, ProyectoId>;
  createProyecto!: Sequelize.HasManyCreateAssociationMixin<Proyecto>;
  removeProyecto!: Sequelize.HasManyRemoveAssociationMixin<Proyecto, ProyectoId>;
  removeProyectos!: Sequelize.HasManyRemoveAssociationsMixin<Proyecto, ProyectoId>;
  hasProyecto!: Sequelize.HasManyHasAssociationMixin<Proyecto, ProyectoId>;
  hasProyectos!: Sequelize.HasManyHasAssociationsMixin<Proyecto, ProyectoId>;
  countProyectos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Cliente {
    return Cliente.init({
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
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
    sequelize,
    tableName: 'clientes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
  }
}
