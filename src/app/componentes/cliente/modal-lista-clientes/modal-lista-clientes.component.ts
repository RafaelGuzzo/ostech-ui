import { map } from 'rxjs/operators';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ModalListaClientes {
  clienteId: number;
  nome: string;
}

@Component({
  selector: 'app-modal-lista-clientes',
  templateUrl: './modal-lista-clientes.component.html'
})
export class ModalListaClientesComponent {

  displayedColumns: string[] = ['clienteId', 'nome'];
  dataSource: ModalListaClientes[];
  clienteSelecionado: ModalListaClientes = { clienteId: -1, nome: "" };

  constructor(
    public dialogRef: MatDialogRef<ModalListaClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.dataSource = data.clientes;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  seleciona(cliente: ModalListaClientes) {
    this.clienteSelecionado = cliente
  }
}
