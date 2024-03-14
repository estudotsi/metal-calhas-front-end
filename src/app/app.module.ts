import { LOCALE_ID, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { TituloComponent } from '../app/componentes/shared/titulo/titulo.component';
import { NavbarComponent } from '../app/componentes/shared/navbar/navbar.component';
import { ListaPedidosComponent } from './componentes/pedidos/lista-pedidos/lista-pedidos.component';
import { DetalhePedidoComponent } from './componentes/pedidos/detalhe-pedido/detalhe-pedido.component';
import { CadastrarPedidoComponent } from './componentes/pedidos/cadastrar-pedido/cadastrar-pedido.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ModalComponent } from './componentes/shared/modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    NavbarComponent,
    ListaPedidosComponent,
    DetalhePedidoComponent,
    CadastrarPedidoComponent,
    ModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({}),
    CurrencyMaskModule,
    ModalModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {provide: LOCALE_ID, useValue: 'pt' },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
