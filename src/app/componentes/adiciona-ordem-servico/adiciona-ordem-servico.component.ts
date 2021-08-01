import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../compartilhado/cliente.service';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { OrdemServicoService } from 'src/app/compartilhado/ordem-servico.service';

@Component({
  selector: 'app-adiciona-ordem-servico',
  templateUrl: './adiciona-ordem-servico.component.html',
  styleUrls: ['./adiciona-ordem-servico.component.css']
})
export class AdicionaOrdemServicoComponent implements OnInit {


  ordemServicoForm: FormGroup;

  ngOnInit() {
    this.iniciaOrdemServicoForm();
    console.log(this.ordemServicoForm);

  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ordemServicoService: OrdemServicoService
  ) { }

  /* Reactive book form */
  iniciaOrdemServicoForm() {
    this.ordemServicoForm = this.fb.group({
      clienteId: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      equipamento: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      preco: [''],
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {

    return this.ordemServicoForm.get(controlName)?.hasError(errorName);
  }

  /* Submit book */
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
