import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Programa, ProgramaId } from './programa';

export interface SedeAttributes {
  id_sede: number;
  sede: string;
}

export type SedePk = "id_sede";
export type SedeId = Sede[SedePk];
export type SedeCreationAttributes = SedeAttributes;

export class Sede extends Model<SedeAttributes, SedeCreationAttributes> implements SedeAttributes {
  id_sede!: number;
  sede!: string;

  // Sede hasMany Programa via id_sede
  programas!: Programa[];
  getProgramas!: Sequelize.HasManyGetAssociationsMixin<Programa>;
  setProgramas!: Sequelize.HasManySetAssociationsMixin<Programa, ProgramaId>;
  addPrograma!: Sequelize.HasManyAddAssociationMixin<Programa, ProgramaId>;
  addProgramas!: Sequelize.HasManyAddAssociationsMixin<Programa, ProgramaId>;
  createPrograma!: Sequelize.HasManyCreateAssociationMixin<Programa>;
  removePrograma!: Sequelize.HasManyRemoveAssociationMixin<Programa, ProgramaId>;
  removeProgramas!: Sequelize.HasManyRemoveAssociationsMixin<Programa, ProgramaId>;
  hasPrograma!: Sequelize.HasManyHasAssociationMixin<Programa, ProgramaId>;
  hasProgramas!: Sequelize.HasManyHasAssociationsMixin<Programa, ProgramaId>;
  countProgramas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sede {
    return Sede.init({
    id_sede: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sede: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sede',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_sede" },
        ]
      },
    ]
  });
  }
}
