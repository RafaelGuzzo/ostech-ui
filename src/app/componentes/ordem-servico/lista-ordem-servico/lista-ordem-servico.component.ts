import { OrdemServicoService } from 'src/app/componentes/ordem-servico/ordem-servico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface InfoOrdemServico {
  id: string;
  equipamento: string;
  descricao: string;
  preco: string;
  status: string;
  dataAbertura: string;
  dataFinalizacao: string;
  cliente: string;
  contato: string;
}

@Component({
  selector: 'app-lista-ordem-servico',
  templateUrl: './lista-ordem-servico.component.html'
})
export class ListaOrdemServicoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cliente', 'contato', 'equipamento', 'dataAbertura', 'acao'];
  dataSource: MatTableDataSource<InfoOrdemServico>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clienteId?: string;

  constructor(
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
    private ordemServicoService: OrdemServicoService
  ) {
    this.clienteId = this.actRoute.snapshot.paramMap.get('clienteId')!;
  }


  ngOnInit(): void {
    if (this.clienteId) {
      this.listaOrdemServicoPorClienteId(this.clienteId);
    } else {
      this.listaTodasOrdensServico();
    }
  }
  listaTodasOrdensServico() {
    this.ordemServicoService.GetAllOrdensServico().subscribe(result => {
      this.dataSource = this.converteResponse(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  listaOrdemServicoPorClienteId(clienteId: string) {
    this.ordemServicoService.GetAllOrdensServicoByClienteId(clienteId).subscribe(result => {
      this.dataSource = this.converteResponse(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  imprime(id: Number) {
    this.ordemServicoService.imprimeOrdemServico(id).subscribe(res => {
      const url = window.URL.createObjectURL(res);
      window.open(url);
    })
  }

  removeOrdemServico(index: number, ordemServico: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar remoção de Ordem de Serviço',
        message: 'Tem certeza de que deseja remover a ordem de serviço n°: ' + ordemServico.id
      }
    });

    //TODO: testar com paginação
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        const data = this.dataSource.data;
        data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
        this.dataSource.data = data;
        this.ordemServicoService.DeleteOrdemServico(ordemServico.id).subscribe();
      }
    })
  }

  private converteResponse(response: any) {
    var array = response.map((resp: any) => {
      var infoOrdemServico: InfoOrdemServico = {
        id: resp.id,
        equipamento: resp.equipamento,
        descricao: resp.descricao,
        preco: resp.preco,
        status: resp.status,
        dataAbertura: resp.dataAbertura,
        dataFinalizacao: resp.dataFinalizacao,
        cliente: resp.cliente.nome,
        contato: resp.cliente.contato,
      }

      return infoOrdemServico;
    });

    return new MatTableDataSource<InfoOrdemServico>(array);
  }
}
