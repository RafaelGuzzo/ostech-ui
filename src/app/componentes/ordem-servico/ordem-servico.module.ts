import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, } from '@angular/core';
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
import { NgxMaskModule } from 'ngx-mask';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)


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
    NgxMaskModule.forRoot(),

    AngularMaterialModule
  ],

  providers: [
    OrdemServicoService,
    { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrdemServicoModule { }


