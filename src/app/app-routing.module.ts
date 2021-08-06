import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdicionaClienteComponent } from './componentes/cliente/adiciona-cliente/adiciona-cliente.component';
import { EditaClienteComponent } from './componentes/cliente/edita-cliente/edita-cliente.component';
import { ListaClienteComponent } from './componentes/cliente/lista-cliente/lista-cliente.component';
import { AdicionaOrdemServicoComponent } from './componentes/ordem-servico/adiciona-ordem-servico/adiciona-ordem-servico.component';
import { EditaOrdemServicoComponent } from './componentes/ordem-servico/edita-ordem-servico/edita-ordem-servico.component';
import { ListaOrdemServicoComponent } from './componentes/ordem-servico/lista-ordem-servico/lista-ordem-servico.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listar-clientes' },
  { path: 'adicionar-cliente',pathMatch: 'full', component: AdicionaClienteComponent },
  { path: 'listar-clientes',component: ListaClienteComponent },
  { path: 'editar-cliente/:clienteId', pathMatch: 'full',component: EditaClienteComponent },
  { path: 'adicionar-ordem-servico',pathMatch: 'full', component: AdicionaOrdemServicoComponent },
  { path: 'adicionar-ordem-servico/:clienteId',pathMatch: 'full', component: AdicionaOrdemServicoComponent },
  { path: 'listar-ordens-servico',component: ListaOrdemServicoComponent },
  { path: 'listar-ordens-servico/:clienteId',component: ListaOrdemServicoComponent },
  { path: 'editar-ordem-servico/:ordemId', component: EditaOrdemServicoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
