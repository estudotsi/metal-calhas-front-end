import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrl: './lista-pedidos.component.scss'
})
export class ListaPedidosComponent implements OnInit{

  public pedido$?: Observable<Pedido[]>;
  public pedidosFiltrados?: Pedido[];
  private filtroListado = '';

  constructor(private pedidoService: PedidoService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toastr: ToastrService) { }

  public get filtroLista(): string {
    return this.filtroListado;
    }

  /*public set filtroLista(value: string) {
    this.filtroListado = value;
    this.pedidosFiltrados = this.filtroLista ? this.filtrarPedidos(this.filtroLista) : this.pedido;
    }

    public filtrarPedidos(filtrarPor: string): Pedido[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.pedido.filter(
        pedido => pedido.vendedor.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }*/

    public buscarPedidos(): void{

      //this.pedido$ = pedidoService.buscarPedidos();

      this.pedidoService.buscarPedidos().subscribe({
        next: (pedidosRecebidos: Pedido[]) => {
          this.pedido$ = of(pedidosRecebidos);
          //this.pedidosFiltrados = this.pedido;
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

  enviarDadosAlterarPedido(id: any){
    console.log(id);
    this.router.navigate([`alterar-pedido/${id}`]);
  }

  deletarPedido(id: any) {
    this.spinner.show();
    this.pedidoService.deletar(id).subscribe({
      next: (data: any) => {
        this.toastr.success("Deletado com sucesso");
        this.buscarPedidos();
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error("Erro ao cadastrar", error.error);
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }

}
