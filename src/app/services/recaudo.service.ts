import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { config } from "../config";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecaudoService {
  readonly URL_RECAUDO: string = `${config.backend.host}${config.backend.recaudoEndPoint}`;
  readonly URL_RECAUDO_EXCEL: string = `${config.backend.host}${config.backend.recaudoExcelEndPoint}`;

  constructor(private http: HttpClient) {}

  GetRecaudos(pagina:number = 1 ): Observable<any> {
    return this.http.get(`${this.URL_RECAUDO}?pagina=${pagina}`);
  }

  GetBytesExcel(fechaInicial: any, fechaFinal: any): Observable<any> {
    let params = `fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`;
    return this.http.get<any>(`${this.URL_RECAUDO_EXCEL}?${params}`);
  }
}
