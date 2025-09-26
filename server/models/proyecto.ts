import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Cliente, ClienteId } from './cliente';
import type { Documentacion, DocumentacionId } from './documentacion';
import type { Estadistica, EstadisticaId } from './estadistica';
import type { Tarea } from './tarea';

export interface ProyectoAttributes {
  id_proyecto: number;
  nombre_proyecto: string;
  id_cliente: number;
  descripcion: string;
  usuario_creacion: string;
  fecha_creacion: Date;
  usuario_actualizacion?: string;
  fecha_actualizacion?: Date;
  valor_contrato: number;
  progreso: number;
  estado: number;
  alcance: string;
  descripcion_servicios: string;
  valor_servicios: string;
  estadisticas?: number;
}

export type ProyectoPk = "id_proyecto";
export type ProyectoId = Proyecto[ProyectoPk];
export type ProyectoOptionalAttributes = "id_proyecto" | "fecha_creacion" | "usuario_actualizacion" | "fecha_actualizacion" | "estadisticas";
export type ProyectoCreationAttributes = Optional<ProyectoAttributes, ProyectoOptionalAttributes>;

export class Proyecto extends Model<ProyectoAttributes, ProyectoCreationAttributes> implements ProyectoAttributes {
  id_proyecto!: number;
  nombre_proyecto!: string;
  id_cliente!: number;
  descripcion!: string;
  usuario_creacion!: string;
  fecha_creacion!: Date;
  usuario_actualizacion?: string;
  fecha_actualizacion?: Date;
  valor_contrato!: number;
  progreso!: number;
  estado!: number;
  alcance!: string;
  descripcion_servicios!: string;
  valor_servicios!: string;
  

  // Proyecto belongsTo Cliente via id_cliente
  id_cliente_cliente!: Cliente;
  getId_cliente_cliente!: Sequelize.BelongsToGetAssociationMixin<Cliente>;
  setId_cliente_cliente!: Sequelize.BelongsToSetAssociationMixin<Cliente, ClienteId>;
  createId_cliente_cliente!: Sequelize.BelongsToCreateAssociationMixin<Cliente>;
  // Proyecto hasMany Documentacion via id_proyecto
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
  // Proyecto hasMany Estadistica via id_proyecto
  
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
  // Proyecto hasMany Tarea via id_proyecto
  tareas!: Tarea[];
  getTareas!: Sequelize.HasManyGetAssociationsMixin<Tarea>;
  setTareas!: Sequelize.HasManySetAssociationsMixin<Tarea, any>;
  addTarea!: Sequelize.HasManyAddAssociationMixin<Tarea, any>;
  addTareas!: Sequelize.HasManyAddAssociationsMixin<Tarea, any>;
  createTarea!: Sequelize.HasManyCreateAssociationMixin<Tarea>;
  removeTarea!: Sequelize.HasManyRemoveAssociationMixin<Tarea, any>;
  removeTareas!: Sequelize.HasManyRemoveAssociationsMixin<Tarea, any>;
  hasTarea!: Sequelize.HasManyHasAssociationMixin<Tarea, any>;
  hasTareas!: Sequelize.HasManyHasAssociationsMixin<Tarea, any>;
  countTareas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Proyecto {
    return Proyecto.init({
    id_proyecto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_proyecto: {
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
    descripcion: {
      type: DataTypes.STRING(250),
      allowNull: false
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
    usuario_actualizacion: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valor_contrato: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    progreso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    alcance: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    descripcion_servicios: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    valor_servicios: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    estadisticas: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'proyectos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_proyecto" },
        ]
      },
      {
        name: "cliente_proyecto",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
  }
}
