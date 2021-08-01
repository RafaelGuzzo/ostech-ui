import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdicionaClienteComponent } from './componentes/adiciona-cliente/adiciona-cliente.component';
import { AdicionaOrdemServicoComponent } from './componentes/adiciona-ordem-servico/adiciona-ordem-servico.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'adiciona-cliente' },
  { path: 'adiciona-cliente', component: AdicionaClienteComponent },
  { path: 'ordem-servico', component: AdicionaOrdemServicoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
