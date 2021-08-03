import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { OrdemServicoService } from 'src/app/componentes/ordem-servico/ordem-servico.service';

@Component({
  selector: 'app-edita-ordem-servico',
  templateUrl: './edita-ordem-servico.component.html'
})
export class EditaOrdemServicoComponent {

  editaOrdemServicoForm: FormGroup;
  ordemId?: String;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ordemServicoService: OrdemServicoService,
    private actRoute: ActivatedRoute,
  ) {
    this.ordemId = this.actRoute.snapshot.paramMap.get('ordemId')!;
    this.iniciaEditaOrdemSevicoForm(this.ordemId)
  }


  iniciaEditaOrdemSevicoForm(ordemId: String) {
    //TODO: busca ordem servico pelo id e insere no form
    this.editaOrdemServicoForm = this.fb.group({
      clienteId: ['1', [Validators.required]],
      cliente: ['Seu Ze', [Validators.required]],
      equipamento: ['celular tal', [Validators.required]],
      descricao: ['parou de funcionar', [Validators.required]],
      preco: [''],
    })

  }

  submitEditaOrdemServicoForm() {
    console.log(this.editaOrdemServicoForm);

  }


  imprime(id: Number) {
    this.ordemServicoService.imprimeOrdemServico(1).subscribe(res => {
      const url = window.URL.createObjectURL(res);
      window.open(url);
    })
  }

  public handleError = (controlName: string, errorName: string) => {

    return this.editaOrdemServicoForm.get(controlName)?.hasError(errorName);
  }



}
