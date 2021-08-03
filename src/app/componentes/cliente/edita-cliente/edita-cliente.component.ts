import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-edita-cliente',
  templateUrl: './edita-cliente.component.html'
})
export class EditaClienteComponent {
  nomeCliente: String;
  editaClienteForm: FormGroup;
  clienteId?: String;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private clienteApi: ClienteService,
    private actRoute: ActivatedRoute,
  ) {
    this.clienteId = this.actRoute.snapshot.paramMap.get('clienteId')!;
    this.iniciaEditaClienteForm(this.clienteId)
    this.nomeCliente = "Um nome"

  }

  iniciaEditaClienteForm(clienteId: String) {
    //TODO: busca cliente no banco pelo id e insere no form
    this.editaClienteForm = this.fb.group({
      clienteId: [1],
      nome: ['Teste', [Validators.required]],
      contato: ['teste', [Validators.required]],
      email: [''],
      cpf: [''],
      telefone: [''],
      endereco: this.fb.group({
        rua: ['ttttt', [Validators.required]],
        bairro: ['tt', [Validators.required]],
        numero: ['asssa', [Validators.required]],
        complemento: [''],
        cep: [''],
        cidade: [''],
        uf: ['']
      })
    })
  }


  public handleError = (controlName: string, errorName: string) => {
    return this.editaClienteForm.get(controlName)?.hasError(errorName);
  }

  submitEditaClienteForm() {
    console.log(this.editaClienteForm);
  }

}
