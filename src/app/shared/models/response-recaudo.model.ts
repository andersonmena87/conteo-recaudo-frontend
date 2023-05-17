import { RecaudoModel } from "./recaudo.model";

export interface ResponseRecaudoModel {
  conteoRecaudoList: RecaudoModel[],
  paginaActual: number,
  registrosPorPagina: number,
  totalRegistros: number
}
