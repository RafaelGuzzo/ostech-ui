import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-lista-clientes',
  templateUrl: './modal-lista-clientes.component.html'
})
export class ModalListaClientesComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalListaClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: String, nome: String }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
