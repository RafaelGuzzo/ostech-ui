import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ModalListaClientes {
  id: number;
  nome: string;
}

const ELEMENT_DATA: ModalListaClientes[] = [
  { id: 1, nome: "Rafael Guzzo" },
  { id: 2, nome: "Rafael Rddsd" },
  { id: 3, nome: "Rafael Brits" },
  { id: 4, nome: "Rafael gerivado" },

]

@Component({
  selector: 'app-modal-lista-clientes',
  templateUrl: './modal-lista-clientes.component.html'
})
export class ModalListaClientesComponent {

  displayedColumns: string[] = ['id', 'nome'];
  dataSource = ELEMENT_DATA;
  clienteSelecionado: ModalListaClientes = {id:-1, nome:""};

  constructor(
    public dialogRef: MatDialogRef<ModalListaClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalListaClientes) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  seleciona(cliente: ModalListaClientes) {
    this.clienteSelecionado = cliente
  }
}
