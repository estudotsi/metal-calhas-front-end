import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

private readonly baseUrl: string = "https://localhost:7149/api/Pedido"

  constructor(public http: HttpClient) { }

  public buscarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>('https://localhost:7149/api/Pedido');
  }

}
