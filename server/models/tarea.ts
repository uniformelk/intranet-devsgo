import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Proyecto, ProyectoId } from './proyecto';

export interface TareaAttributes {
  id_proyecto: number;
  tarea: string;
  estado: number;
  fecha_creacion: Date;
  usuario_creacion: string;
  fecha_actualizacion?: Date;
  usuario_actualizacion?: string;
}

export type TareaOptionalAttributes = "fecha_creacion" | "fecha_actualizacion" | "usuario_actualizacion";
export type TareaCreationAttributes = Optional<TareaAttributes, TareaOptionalAttributes>;

export class Tarea extends Model<TareaAttributes, TareaCreationAttributes> implements TareaAttributes {
  id_proyecto!: number;
  tarea!: string;
  estado!: number;
  fecha_creacion!: Date;
  usuario_creacion!: string;
  fecha_actualizacion?: Date;
  usuario_actualizacion?: string;

  // Tarea belongsTo Proyecto via id_proyecto
  id_proyecto_proyecto!: Proyecto;
  getId_proyecto_proyecto!: Sequelize.BelongsToGetAssociationMixin<Proyecto>;
  setId_proyecto_proyecto!: Sequelize.BelongsToSetAssociationMixin<Proyecto, ProyectoId>;
  createId_proyecto_proyecto!: Sequelize.BelongsToCreateAssociationMixin<Proyecto>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Tarea {
    return Tarea.init({
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proyectos',
        key: 'id_proyecto'
      }
    },
    tarea: {
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
      type: DataTypes.STRING(250),
      allowNull: false
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    usuario_actualizacion: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tareas',
    timestamps: false,
    indexes: [
      {
        name: "proyecto",
        using: "BTREE",
        fields: [
          { name: "id_proyecto" },
        ]
      },
    ]
  });
  }
}
