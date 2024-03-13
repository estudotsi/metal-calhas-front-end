import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../../../models/pedido.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrl: './detalhe-pedido.component.scss'
})
export class DetalhePedidoComponent implements OnInit{

  public formPedidoAlterar!: FormGroup;
  public pedido?: Pedido;
  id?: any;

  constructor(private pedidoService: PedidoService,
              private activatedRouter: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {

    this.spinner.show();
    this.buscarPedidoPorId();

    this.formPedidoAlterar = this.formBuilder.group({
      id: ['',],
      dataVenda: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      vendedor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cliente: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      observacao: ['', Validators.required],
      valor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)] ],
      dataEntrega: ['', Validators.required],
      hora: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)] ],
        });
      }

      public alterarPedido() {
        this.pedido = this.formPedidoAlterar!.value;
        this.spinner.show();
        this.pedidoService.alterarPedido(this.pedido!, this.pedido!.id).subscribe({
          next: (data: any) => {
            this.toastr.success("Alterado com sucesso", data.id);
            this.router.navigate([ '/' ]);
          },
          error: (error: any) => {
            this.spinner.hide();
              this.toastr.error("Erro ao cadastrar", error.error);
          },
          complete: () => {
            //this.formDirective.resetForm();
            this.spinner.hide();
          }
        })
      }

      public buscarPedidoPorId(): void{
        this.id = this.activatedRouter.snapshot.paramMap.get('id');
        this.pedidoService.buscarPedidosPorId(this.id).subscribe({
          next: (pedidoRecebido: Pedido) => {
            this.pedido = pedidoRecebido;
            this.formPedidoAlterar.patchValue(pedidoRecebido);
          },
          error: (error: any) => {
            this.spinner.hide();
          },
          complete: () => this.spinner.hide()
        });
      }

}
