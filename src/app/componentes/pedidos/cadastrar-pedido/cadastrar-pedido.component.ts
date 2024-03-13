import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from '../../../models/pedido.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-pedido',
  templateUrl: './cadastrar-pedido.component.html',
  styleUrl: './cadastrar-pedido.component.scss'
})
export class CadastrarPedidoComponent implements OnInit{

  public formPedido!: FormGroup;
  public pedido?: Pedido;
  public id?: any;

  constructor(private pedidoService: PedidoService,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {



    this.formPedido = this.formBuilder.group({
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

  public cadastrarPedido() {
    this.pedido = this.formPedido!.value;
    this.spinner.show();
    this.pedidoService.cadastrarPedido(this.pedido!).subscribe({
      next: (data: any) => {
        this.toastr.success("Salvo com sucesso", data.id);
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



}
