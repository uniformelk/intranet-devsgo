import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { DetallePrograma } from './detallePrograma';
import type { Sede, SedeId } from './sede';

export interface ProgramaAttributes {
  id_programa: number;
  id_sede: number;
  programa: string;
  imagen: string;
  codigo_programa: string;
}

export type ProgramaPk = "id_programa";
export type ProgramaId = Programa[ProgramaPk];
export type ProgramaOptionalAttributes = "id_programa";
export type ProgramaCreationAttributes = Optional<ProgramaAttributes, ProgramaOptionalAttributes>;

export class Programa extends Model<ProgramaAttributes, ProgramaCreationAttributes> implements ProgramaAttributes {
  id_programa!: number;
  id_sede!: number;
  programa!: string;
  imagen!: string;
  codigo_programa!: string;

  // Programa hasMany DetallePrograma via id_programa
  detalle_programas!: DetallePrograma[];
  getDetalle_programas!: Sequelize.HasManyGetAssociationsMixin<DetallePrograma>;
  setDetalle_programas!: Sequelize.HasManySetAssociationsMixin<DetallePrograma, any>;
  addDetalle_programa!: Sequelize.HasManyAddAssociationMixin<DetallePrograma, any>;
  addDetalle_programas!: Sequelize.HasManyAddAssociationsMixin<DetallePrograma, any>;
  createDetalle_programa!: Sequelize.HasManyCreateAssociationMixin<DetallePrograma>;
  removeDetalle_programa!: Sequelize.HasManyRemoveAssociationMixin<DetallePrograma, any>;
  removeDetalle_programas!: Sequelize.HasManyRemoveAssociationsMixin<DetallePrograma, any>;
  hasDetalle_programa!: Sequelize.HasManyHasAssociationMixin<DetallePrograma, any>;
  hasDetalle_programas!: Sequelize.HasManyHasAssociationsMixin<DetallePrograma, any>;
  countDetalle_programas!: Sequelize.HasManyCountAssociationsMixin;
  // Programa belongsTo Sede via id_sede
  id_sede_sede!: Sede;
  getId_sede_sede!: Sequelize.BelongsToGetAssociationMixin<Sede>;
  setId_sede_sede!: Sequelize.BelongsToSetAssociationMixin<Sede, SedeId>;
  createId_sede_sede!: Sequelize.BelongsToCreateAssociationMixin<Sede>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Programa {
    return Programa.init({
    id_programa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_sede: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sede',
        key: 'id_sede'
      }
    },
    programa: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    codigo_programa: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'programa',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_programa" },
        ]
      },
      {
        name: "sede",
        using: "BTREE",
        fields: [
          { name: "id_sede" },
        ]
      },
    ]
  });
  }
}
