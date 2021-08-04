import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { OrdemServicoService } from 'src/app/componentes/ordem-servico/ordem-servico.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { ModalListaClientesComponent } from '../../cliente/modal-lista-clientes/modal-lista-clientes.component';

@Component({
  selector: 'app-adiciona-ordem-servico',
  templateUrl: './adiciona-ordem-servico.component.html'
})
export class AdicionaOrdemServicoComponent implements OnInit {

  clienteId?: String;
  cliente: String;
  ordemServicoForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ordemServicoService: OrdemServicoService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.clienteId = this.actRoute.snapshot.paramMap.get('clienteId')!;
  }

  ngOnInit() {
    this.iniciaOrdemServicoForm();

    if (this.clienteId) {
      this.buscaClientePorId(this.clienteId)
    }
  }

  iniciaOrdemServicoForm() {
    this.ordemServicoForm = this.fb.group({
      clienteId: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      equipamento: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      preco: [''],
    })
  }

  buscaCLientePorNome(nomeCliente: String) {
    //TODO: faz busca por nome cliente like e abre um modal com as opções aquele que for clicado deve popular o id e o nome
    console.log(nomeCliente);


    const dialogRef = this.dialog.open(ModalListaClientesComponent, {
      data: { id: "string", nome: nomeCliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ordemServicoForm.patchValue({
          clienteId: result.id,
          cliente: result.nome
        })
      }
    });
  }

  buscaClientePorId(clienteId: String) {
    //TODO: faz a busca de cliente e insere no formulario
    this.ordemServicoForm.patchValue({
      clienteId: clienteId,
      cliente: "Seu Geronimo"
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.ordemServicoForm.get(controlName)?.hasError(errorName);
  }

  submitOrdemServicoForm() {
    /*
    if (this.ordemServicoForm.valid) {
      console.log(this.ordemServicoForm.value);

      this.clienteApi.AddCliente(this.ordemServicoForm.value).subscribe(res => {
        console.log(res);

      });
    }
  */}

}
