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
import { Cliente as _Cliente } from "./client";
import type { ClienteAttributes, ClienteCreationAttributes } from "./client";
import { Usuario as _Usuario } from "./users";
import type { UsuarioAttributes, UsuarioCreationAttributes } from "./users";

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
  _Cliente as Cliente,
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
  ClienteAttributes,
  ClienteCreationAttributes,
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
  const Cliente = _Cliente.initModel(sequelize);

  DetallePrograma.belongsTo(Programa, { as: "id_programa_programa", foreignKey: "id_programa" });
  Programa.hasMany(DetallePrograma, { as: "detalle_programas", foreignKey: "id_programa" });
  Documentacion.belongsTo(Proyecto, { as: "id_proyecto_proyecto", foreignKey: "id_proyecto" });
  Proyecto.hasMany(Documentacion, { as: "documentacions", foreignKey: "id_proyecto" });
  Estadistica.belongsTo(Proyecto, { as: "id_proyecto_proyecto", foreignKey: "id_proyecto" });
  Proyecto.hasMany(Estadistica, { as: "estadisticas_rel", foreignKey: "id_proyecto" });
  Tarea.belongsTo(Proyecto, { as: "id_proyecto_proyecto", foreignKey: "id_proyecto" });
  Proyecto.hasMany(Tarea, { as: "tareas", foreignKey: "id_proyecto" });
  Programa.belongsTo(Sede, { as: "id_sede_sede", foreignKey: "id_sede" });
  Sede.hasMany(Programa, { as: "programas", foreignKey: "id_sede" });
  Proyecto.belongsTo(Cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente" });
  Cliente.hasMany(Proyecto, { as: "proyectos", foreignKey: "id_cliente" });
  Documentacion.belongsTo(Cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente" });
  Cliente.hasMany(Documentacion, { as: "documentacions", foreignKey: "id_cliente" });
  Estadistica.belongsTo(Cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente" });
  Cliente.hasMany(Estadistica, { as: "estadisticas", foreignKey: "id_cliente" });

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
    Cliente: Cliente,
  };
}