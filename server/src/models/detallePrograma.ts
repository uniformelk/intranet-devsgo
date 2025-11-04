import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Programa, ProgramaId } from './programa';

export interface DetalleProgramaAttributes {
  id_programa: number;
  titulo: string;
  nivel_formacion: string;
  modalidad: string;
  creditos: number;
  snies: number;
  reg_calificado: string;
  duracion: string;
  conocimiento: string;
  precio_ofi: string;
  precio_sub: string;
}

export type DetalleProgramaCreationAttributes = DetalleProgramaAttributes;

export class DetallePrograma extends Model<DetalleProgramaAttributes, DetalleProgramaCreationAttributes> implements DetalleProgramaAttributes {
  id_programa!: number;
  titulo!: string;
  nivel_formacion!: string;
  modalidad!: string;
  creditos!: number;
  snies!: number;
  reg_calificado!: string;
  duracion!: string;
  conocimiento!: string;
  precio_ofi!: string;
  precio_sub!: string;

  // DetallePrograma belongsTo Programa via id_programa
  id_programa_programa!: Programa;
  getId_programa_programa!: Sequelize.BelongsToGetAssociationMixin<Programa>;
  setId_programa_programa!: Sequelize.BelongsToSetAssociationMixin<Programa, ProgramaId>;
  createId_programa_programa!: Sequelize.BelongsToCreateAssociationMixin<Programa>;

  static initModel(sequelize: Sequelize.Sequelize): typeof DetallePrograma {
    return DetallePrograma.init({
    id_programa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'programa',
        key: 'id_programa'
      }
    },
    titulo: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    nivel_formacion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    modalidad: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    snies: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reg_calificado: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    duracion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    conocimiento: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    precio_ofi: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    precio_sub: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'detalle_programa',
    timestamps: false,
    indexes: [
      {
        name: "programas",
        using: "BTREE",
        fields: [
          { name: "id_programa" },
        ]
      },
    ]
  });
  }
}
