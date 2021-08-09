import { ClienteService } from './../cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ClienteList {
  id: string,
  nome: string,
  email: string,
  contato: string,
  telefone: string,
}

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html'
})

export class ListaClienteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'email', 'contato', 'telefone', 'acao'];
  dataSource: MatTableDataSource<ClienteList>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.listaTodosClientes();
  }

  listaTodosClientes() {
    this.clienteService.GetClientes().subscribe(result => {
      var clientes = this.converteResponse(result);
      this.dataSource = new MatTableDataSource<ClienteList>(clientes);
      this.dataSource.paginator = this.paginator;
    });
  }



  removeCliente(index: number, cliente: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar remoção de cliente',
        message: 'Tem certeza de que deseja remover o cliente: ' + cliente.nome,
        obs: ' Obs: tambem será removido as Ordens de Serviço relacionadas ao cliente!'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log(cliente);

        const data = this.dataSource.data;
        data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
        this.dataSource.data = data;
        this.clienteService.DeleteCliente(cliente.id).subscribe();
      }
    })
  }

  private converteResponse(response: any) {
    return response.map((resp: any) => {
      var clienteList: ClienteList = {
        id: resp.clienteId,
        nome: resp.nome,
        email: resp.email,
        contato: resp.contato,
        telefone: resp.telefone,
      }

      return clienteList;
    });
  }

}
