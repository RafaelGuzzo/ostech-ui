import { Cliente } from './../cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-edita-cliente',
  templateUrl: './edita-cliente.component.html'
})
export class EditaClienteComponent implements OnInit {
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
    this.iniciaEditaClienteForm();
  }
  ngOnInit(): void {
    if (this.clienteId) {
      this.buscaClientePorId()
    }
  }

  buscaClientePorId() {
    this.clienteApi.GetCliente(Number(this.clienteId!)).subscribe(res => {
      this.editaClienteForm.patchValue(res);
    });
  }

  iniciaEditaClienteForm() {
    this.editaClienteForm = this.fb.group({
      clienteId: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      contato: [null, [Validators.required]],
      email: [''],
      cpf: [''],
      telefone: [''],
      endereco: this.fb.group({
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        numero: [null, [Validators.required]],
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
    this.clienteApi.UpdateCliente(Number(this.clienteId!), this.editaClienteForm.value).subscribe(res => {
      //TODO: trocar por toasty
      window.alert(`cliente ${res.nome} atualizado com sucesso!`);
    });
  }

}
