import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdicionaClienteComponent } from './componentes/adiciona-cliente/adiciona-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './compartilhado/cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdemServicoService } from './compartilhado/ordem-servico.service';
import { AdicionaOrdemServicoComponent } from './componentes/adiciona-ordem-servico/adiciona-ordem-servico.component';

@NgModule({
  declarations: [
    AppComponent,
    AdicionaClienteComponent,
    AdicionaOrdemServicoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ClienteService,
    OrdemServicoService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
