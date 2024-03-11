import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrl: './lista-pedidos.component.scss'
})
export class ListaPedidosComponent implements OnInit{

  public pedido: Pedido[] = [];
  public pedidosFiltrados: Pedido[] = [];
  private filtroListado = '';

  constructor(private pedidoService: PedidoService,
              private spinner: NgxSpinnerService) { }

  public get filtroLista(): string {
    return this.filtroListado;
    }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.pedidosFiltrados = this.filtroLista ? this.filtrarPedidos(this.filtroLista) : this.pedido;
    }

    public filtrarPedidos(filtrarPor: string): Pedido[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.pedido.filter(
        pedido => pedido.vendedor.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }

    public buscarPedidos(): void{
      this.pedidoService.buscarPedidos().subscribe({
        next: (pedidosRecebidos: Pedido[]) => {
          this.pedido = pedidosRecebidos;
          this.pedidosFiltrados = this.pedido;
        },
        error: (error: any) => {
          this.spinner.hide();
        },
        complete: () => this.spinner.hide()
      });
    }

  ngOnInit(): void {
    this.spinner.show();
    this.buscarPedidos();
  }

}
