import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../compartilhado/cliente.service';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";

@Component({
  selector: 'app-adiciona-cliente',
  templateUrl: './adiciona-cliente.component.html',
  styleUrls: ['./adiciona-cliente.component.css']
})
export class AdicionaClienteComponent implements OnInit {

  clienteForm: FormGroup;

  ngOnInit() {
    this.iniciaClienteForm();
    console.log(this.clienteForm);

  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private clienteApi: ClienteService
  ) { }

  /* Reactive book form */
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

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
       
    return this.clienteForm.get(controlName)?.hasError(errorName);
    //return this.clienteForm.controls[controlName].hasError(errorName);
  }

  /* Submit book */
  submitClienteForm() {
    if (this.clienteForm.valid) {
      console.log(this.clienteForm.value);

      this.clienteApi.AddCliente(this.clienteForm.value).subscribe(res => {
        console.log(res);

      });
    }
  }


}
