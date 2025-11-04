import type { Sequelize } from "sequelize";
import { DetallePrograma as _DetallePrograma } from "./detallePrograma";
import type { DetalleProgramaAttributes, DetalleProgramaCreationAttributes } from "./detallePrograma";
import { Documentacion as _Documentacion } from "./documentacion";
import type { DocumentacionAttributes, DocumentacionCreationAttributes } from "./documentacion";
import { Estadistica as _Estadistica } from "./estadistica";
import type { EstadisticaAttributes, EstadisticaCreationAttributes } from "./estadistica";
import { Log as _Log } from "./log";
import type { LogAttributes, LogCreationAttributes } from "./log";
import { Programa as _Programa } from "./programa";
import type { ProgramaAttributes, ProgramaCreationAttributes } from "./programa";
import { Proyecto as _Proyecto } from "./proyecto";
import type { ProyectoAttributes, ProyectoCreationAttributes } from "./proyecto";
import { Sede as _Sede } from "./sede";
import type { SedeAttributes, SedeCreationAttributes } from "./sede";
import { Tarea as _Tarea } from "./tarea";
import type { TareaAttributes, TareaCreationAttributes } from "./tarea";
import { Usuario as _Usuario } from "./usuario";
import type { UsuarioAttributes, UsuarioCreationAttributes } from "./usuario";

export {
  _DetallePrograma as DetallePrograma,
  _Documentacion as Documentacion,
  _Estadistica as Estadistica,
  _Log as Log,
  _Programa as Programa,
  _Proyecto as Proyecto,
  _Sede as Sede,
  _Tarea as Tarea,
  _Usuario as Usuario,
};

export type {
  DetalleProgramaAttributes,
  DetalleProgramaCreationAttributes,
  DocumentacionAttributes,
  DocumentacionCreationAttributes,
  EstadisticaAttributes,
  EstadisticaCreationAttributes,
  LogAttributes,
  LogCreationAttributes,
  ProgramaAttributes,
  ProgramaCreationAttributes,
  ProyectoAttributes,
  ProyectoCreationAttributes,
  SedeAttributes,
  SedeCreationAttributes,
  TareaAttributes,
  TareaCreationAttributes,
  UsuarioAttributes,
  UsuarioCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const DetallePrograma = _DetallePrograma.initModel(sequelize);
  const Documentacion = _Documentacion.initModel(sequelize);
  const Estadistica = _Estadistica.initModel(sequelize);
  const Log = _Log.initModel(sequelize);
  const Programa = _Programa.initModel(sequelize);
  const Proyecto = _Proyecto.initModel(sequelize);
  const Sede = _Sede.initModel(sequelize);
  const Tarea = _Tarea.initModel(sequelize);
  const Usuario = _Usuario.initModel(sequelize);

  DetallePrograma.belongsTo(Programa, { as: "id_programa_programa", foreignKey: "id_programa"});
  Programa.hasMany(DetallePrograma, { as: "detalle_programas", foreignKey: "id_programa"});
  Documentacion.belongsTo(Proyecto, { as: "id_proyecto_proyecto", foreignKey: "id_proyecto"});
  Proyecto.hasMany(Documentacion, { as: "documentacions", foreignKey: "id_proyecto"});
  Estadistica.belongsTo(Proyecto, { as: "id_proyecto_proyecto", foreignKey: "id_proyecto"});
  Proyecto.hasMany(Estadistica, { as: "estadisticas", foreignKey: "id_proyecto"});
  Tarea.belongsTo(Proyecto, { as: "id_proyecto_proyecto", foreignKey: "id_proyecto"});
  Proyecto.hasMany(Tarea, { as: "tareas", foreignKey: "id_proyecto"});
  Programa.belongsTo(Sede, { as: "id_sede_sede", foreignKey: "id_sede"});
  Sede.hasMany(Programa, { as: "programas", foreignKey: "id_sede"});

  return {
    DetallePrograma: DetallePrograma,
    Documentacion: Documentacion,
    Estadistica: Estadistica,
    Log: Log,
    Programa: Programa,
    Proyecto: Proyecto,
    Sede: Sede,
    Tarea: Tarea,
    Usuario: Usuario,
  };
}