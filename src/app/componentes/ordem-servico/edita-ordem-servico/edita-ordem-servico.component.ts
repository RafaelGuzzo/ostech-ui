import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { OrdemServicoService } from 'src/app/componentes/ordem-servico/ordem-servico.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edita-ordem-servico',
  templateUrl: './edita-ordem-servico.component.html'
})
export class EditaOrdemServicoComponent {

  editaOrdemServicoForm: FormGroup;
  ordemId?: string;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ordemServicoService: OrdemServicoService,
    private actRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.ordemId = this.actRoute.snapshot.paramMap.get('ordemId')!;
    this.iniciaEditaOrdemSevicoForm();
    this.getOrdemServico();
  }

  iniciaEditaOrdemSevicoForm() {
    this.editaOrdemServicoForm = this.fb.group({
      clienteId: [null, [Validators.required]],
      cliente: [null, [Validators.required]],
      equipamento: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      preco: [null],
    });
  }

  getOrdemServico() {
    this.ordemServicoService.GetOrdemServico(Number(this.ordemId)).subscribe(res => {
      this.editaOrdemServicoForm.patchValue({
        clienteId: res.cliente.clienteId,
        cliente: res.cliente.nome,
        equipamento: res.equipamento,
        descricao: res.descricao,
        preco: res.preco,
      });
    });
  }

  submitEditaOrdemServicoForm() {
    this.ordemServicoService.UpdateOrdemServico(Number(this.ordemId), this.editaOrdemServicoForm.value).subscribe(res => {
      this.snackBar.open("Ordem de Serviço atualizada com sucesso!", "", {
        duration: 4000,
        verticalPosition: "top"
      });
    });
  }

  imprime() {
    this.ordemServicoService.imprimeOrdemServico(Number(this.ordemId)).subscribe(res => {
      const url = window.URL.createObjectURL(res);
      window.open(url);
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.editaOrdemServicoForm.get(controlName)?.hasError(errorName);
  }
}
