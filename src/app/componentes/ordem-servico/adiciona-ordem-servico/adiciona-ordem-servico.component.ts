import { ClienteService } from './../../cliente/cliente.service';
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
    private clienteService: ClienteService,
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

  buscaCLientePorNome(nomeCliente: string) {
    this.clienteService.GetClienteByNomeLike(nomeCliente).subscribe(res => {
      this.abreDialogClientes(res, nomeCliente);
    });
  }

  abreDialogClientes(clientes: any, nomeCliente: String) {
    const dialogRef = this.dialog.open(ModalListaClientesComponent, {
      data: { nome: nomeCliente, clientes: clientes }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ordemServicoForm.patchValue({
          clienteId: result.clienteId,
          cliente: result.nome
        })
      }
    });
  }

  buscaClientePorId(clienteId: String) {
    this.clienteService.GetCliente(Number(clienteId)).subscribe(res => {
      this.ordemServicoForm.patchValue({
        clienteId: res.clienteId,
        cliente: res.nome
      });
    });

  }

  public handleError = (controlName: string, errorName: string) => {
    return this.ordemServicoForm.get(controlName)?.hasError(errorName);
  }

  submitOrdemServicoForm() {
    if (this.ordemServicoForm.valid) {
      this.ordemServicoService.AddOrdemServico(this.ordemServicoForm.value).subscribe(res => {
        this.router.navigateByUrl(`/editar-ordem-servico/${res.id}`);
      });
    }
  }

}
