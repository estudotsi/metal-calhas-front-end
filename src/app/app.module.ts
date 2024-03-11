import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { TituloComponent } from '../app/componentes/shared/titulo/titulo.component';
import { NavbarComponent } from '../app/componentes/shared/navbar/navbar.component';
import { ListaPedidosComponent } from './componentes/pedidos/lista-pedidos/lista-pedidos.component';
import { DetalhePedidoComponent } from './componentes/pedidos/detalhe-pedido/detalhe-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    NavbarComponent,
    ListaPedidosComponent,
    DetalhePedidoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
