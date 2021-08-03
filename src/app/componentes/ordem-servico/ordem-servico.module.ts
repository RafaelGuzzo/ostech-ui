import { CUSTOM_ELEMENTS_SCHEMA, NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemServicoService } from './ordem-servico.service';
import { AdicionaOrdemServicoComponent } from './adiciona-ordem-servico/adiciona-ordem-servico.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditaOrdemServicoComponent } from './edita-ordem-servico/edita-ordem-servico.component';
import { ListaOrdemServicoComponent } from './lista-ordem-servico/lista-ordem-servico.component';
import { RouterModule } from '@angular/router';
import { ClienteModule } from '../cliente/cliente.module';



@NgModule({
  declarations: [
    AdicionaOrdemServicoComponent,
    EditaOrdemServicoComponent,
    ListaOrdemServicoComponent
  ],
  imports: [
    CommonModule,

    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    AngularMaterialModule
  ],

  providers: [OrdemServicoService],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrdemServicoModule { }
