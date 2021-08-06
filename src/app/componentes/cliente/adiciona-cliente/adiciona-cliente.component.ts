import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-adiciona-cliente',
  templateUrl: './adiciona-cliente.component.html'
})
export class AdicionaClienteComponent implements OnInit {

  clienteForm: FormGroup;

  ngOnInit() {
    this.iniciaClienteForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private clienteApi: ClienteService
  ) { }

  iniciaClienteForm() {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required]],
      contato: ['', [Validators.required]],
      email: [''],
      cpf: [''],
      telefone: [''],
      endereco: this.fb.group({
        rua: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        cep: [''],
        cidade: [''],
        uf: ['']
      })
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.clienteForm.get(controlName)?.hasError(errorName);
  }

  submitClienteForm() {
    if (this.clienteForm.valid) {
      this.clienteApi.AddCliente(this.clienteForm.value).subscribe(res => {
        this.router.navigateByUrl(`/editar-cliente/${res.id}`)
      });
    }
  }


}
