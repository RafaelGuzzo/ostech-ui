import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

const ELEMENT_DATA: any[] = [
  { id: 1, nome: 'Rafael', email: "teste@teste", contato: 'teste', telefone: "teste" },
  { id: 1, nome: 'Rafael', email: "teste@teste", contato: 'teste', telefone: "teste" },
  { id: 1, nome: 'Rafael', email: "teste@teste", contato: 'teste', telefone: "teste" },
  { id: 1, nome: 'Rafael', email: "teste@teste", contato: 'teste', telefone: "teste" },
  { id: 1, nome: 'Rafael', email: "teste@teste", contato: 'teste', telefone: "teste" },

];

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html'
})

export class ListaClienteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'email', 'contato', 'telefone', 'acao'];
  dataSource = ELEMENT_DATA;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  removeCliente(cliente: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar remoção de cliente',
        message: 'Tem certeza de que deseja remover o cliente: ' + cliente.nome
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      console.log(result);

    })
  }

}
