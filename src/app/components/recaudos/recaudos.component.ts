import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecaudoModel } from 'src/app/shared/models/recaudo.model';
import { RecaudoService } from 'src/app/services/recaudo.service';
import { ResponseRecaudoModel } from 'src/app/shared/models/response-recaudo.model';

@Component({
  selector: 'app-recaudos',
  templateUrl: './recaudos.component.html',
  styleUrls: ['./recaudos.component.scss']
})
export class RecaudosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fecha', 'estacion', 'sentido', 'hora', 'categoria', 'cantidad', 'valorTabulado'];
  dataSource: any = null;
  recaudos?: RecaudoModel[];
  inputFiltro?: string;

  registrosPorPagina?: number;
  pageIndex?: number;
  pageEvent?: PageEvent;

  constructor(
    private recaudoService: RecaudoService
  ) {
    this.dataSource = new MatTableDataSource(this.recaudos);
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef | any;

  ngOnInit() {
    this.getRecaudos();
  }

  getRecaudos(pagina: number = 1) {
    this.recaudoService.GetRecaudos(pagina)
      .subscribe({
        next: (response: ResponseRecaudoModel) => {
          this.recaudos = response.conteoRecaudoList;
          this.registrosPorPagina = response.totalRegistros;
          this.pageIndex = response.paginaActual > 1 ? response.paginaActual : 0;
          this.dataSource = new MatTableDataSource(this.recaudos);
          this.dataSource.sort = this.sort;
        },
        error: error => {
          console.error(error)
        }
      })
  }

  handlePageEvent(e: PageEvent) {
    let page = e.pageIndex;
    this.pageIndex = page;
    page++;
    this.getRecaudos(page);
  }

  filtrar(event: Event) {
    const filtro: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
