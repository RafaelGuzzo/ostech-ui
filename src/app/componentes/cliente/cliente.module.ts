import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from './cliente.service';
import { AdicionaClienteComponent } from './adiciona-cliente/adiciona-cliente.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { EditaClienteComponent } from './edita-cliente/edita-cliente.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { RouterModule } from '@angular/router';
import { ModalListaClientesComponent } from './modal-lista-clientes/modal-lista-clientes.component';
import { NgxMaskModule } from 'ngx-mask';




@NgModule({
  declarations: [
    AdicionaClienteComponent,
    EditaClienteComponent,
    ListaClienteComponent,
    ModalListaClientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxMaskModule.forRoot(),

    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    AngularMaterialModule
  ],
  exports:[ModalListaClientesComponent],
  providers: [ClienteService],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClienteModule { }
