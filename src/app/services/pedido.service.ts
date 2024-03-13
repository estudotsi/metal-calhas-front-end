import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

private readonly baseUrl: string = environment.apiUrl;
teste$ = Observable<Pedido[]>;

  constructor(public http: HttpClient) { }

  public buscarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}pedidos`);
  }

  public buscarPedidosPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}pedidos/${id}`);
  }

  public cadastrarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}pedidos`, pedido);
  }

  public alterarPedido(pedido: Pedido, id: any): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.baseUrl}pedidos/${id}`, pedido);
  }

  public deletar(id: any): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}pedidos/${id}`);
  }

}
