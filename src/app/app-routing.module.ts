import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPedidosComponent } from './componentes/pedidos/lista-pedidos/lista-pedidos.component';
import { CadastrarPedidoComponent } from './componentes/pedidos/cadastrar-pedido/cadastrar-pedido.component';

const routes: Routes = [
  { path: '', component: ListaPedidosComponent},
  { path: 'cadastrar-pedido', component: CadastrarPedidoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
