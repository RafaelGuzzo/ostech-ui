import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

const ELEMENT_DATA: any[] = [
  { id: "1", cliente: 'Rafael', contato: 'teste', equipamento: "teste", dataAbertura: "teste@teste" },
  { id: "2", cliente: 'teste', contato: 'teste', equipamento: "teste", dataAbertura: "teste@teste" },
  { id: "3", cliente: 'Rafael', contato: 'teste', equipamento: "teste", dataAbertura: "teste@teste" },
];

@Component({
  selector: 'app-lista-ordem-servico',
  templateUrl: './lista-ordem-servico.component.html'
})
export class ListaOrdemServicoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cliente', 'contato', 'equipamento', 'dataAbertura', 'acao'];
  dataSource = ELEMENT_DATA;
  clienteId?: string;

  constructor(
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
  ) {
    this.clienteId = this.actRoute.snapshot.paramMap.get('clienteId')!;
  }


  ngOnInit(): void {
    if (this.clienteId) {
      this.listaOrdemServicoPorClienteId(this.clienteId)
    }
  }

  listaOrdemServicoPorClienteId(clienteId: String) {
    //TODO: buscar ordens de serviço pelo id do cliente
    this.dataSource = ELEMENT_DATA.filter(row => {
      return row.id == clienteId;
    })

  }

  removeOrdemServico(ordemServico: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar remoção de Ordem de Serviço',
        message: 'Tem certeza de que deseja remover a ordem de serviço n°: ' + ordemServico.id
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      //TODO: remover a ordem de serviço caso true

    })
  }

}
