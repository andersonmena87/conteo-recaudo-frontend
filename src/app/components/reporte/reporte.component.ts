import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { RecaudoService } from 'src/app/services/recaudo.service';
import { DatePipe } from '@angular/common';

const year = 2021;
const month = 7
const startDay = 1;
const days = 30;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class ReporteComponent implements OnInit {
  reporteformGroup: any;
  formControl: any;
  minDate = new Date(year, month, startDay);
  maxDate = new Date();
  maxDateFinal = new Date(year, 9, 6);

  constructor(
    private fb: FormBuilder,
    private recaudoService: RecaudoService,
    private datePipe: DatePipe
  ){ }

  ngOnInit() {
    this.reporteformGroup = this.fb.group({
      fechaInicial: [new Date(year, month, startDay), [Validators.required]],
      fechaFinal: [new Date(year, month, startDay), [Validators.required]]
    })
  }

  setMaxDate() {
    const fecha = new Date(this.reporteformGroup.get('fechaInicial').value.toISOString());
    fecha.setDate(fecha.getDate() + days);

    this.maxDateFinal = fecha;
    this.reporteformGroup.get("fechaFinal").setValue(fecha);

  }

  getExcel() {
    const fechaInicial = this.datePipe.transform(this.reporteformGroup.get("fechaInicial").value, 'yyyy-MM-dd', 'es-ES');
    const fechaFinal = this.datePipe.transform(this.reporteformGroup.get("fechaFinal").value, 'yyyy-MM-dd', 'es-ES');

    this.recaudoService.GetBytesExcel(fechaInicial, fechaFinal)
      .subscribe({
        next: response => {
          this.exportToXls(response.archivo, response.nombreArchivo);
        },
        error: error => {
          console.error(error);
        }
    });
  }

  exportToXls(archivo: string, nombre: string) {
    const byteArray = new Uint8Array(atob(archivo).split('').map(char => char.charCodeAt(0)));
    let file = new Blob([byteArray], { type: 'application/vnd.ms-excel' });
    var fileURL = URL.createObjectURL(file);
    var anchor = document.createElement("a");
    anchor.download = nombre;
    anchor.href = fileURL;
    anchor.click();
  }

  getErrorMessageFecha() {
    return 'Fecha no válida';
  }

}
