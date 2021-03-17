import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [];
  accion = 'Agergar';
  form: FormGroup;
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      noTarjeta: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      fechaExp: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe(
      (data) => {
        this.listTarjetas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarTarjeta(): void {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      noTarjeta: this.form.get('noTarjeta')?.value,
      fechaExp: this.form.get('fechaExp')?.value,
      cvv: this.form.get('cvv')?.value,
    };

    if (this.id == undefined) {
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(
        (data) => {
          this.toastr.success(
            `La tarjeta de ${tarjeta.titular} ha sido agregada exitosamente`,
            '¡Tarjeta registrada!'
          );
          this.form.reset();
          this.obtenerTarjetas();
        },
        (err) => {
          this.toastr.error('Algo salió mal', '¡Error!');
          console.log(err);
        }
      );
    } else {
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(
        (data) => {
          this.form.reset();
          this.accion = 'agregar';
          this.id = undefined;
          this.toastr.info(
            'La tarjeta ha sido actualizada con éxito',
            '¡Tarjeta actualizada!'
          );
          this.obtenerTarjetas();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  editarTarjeta(tarjeta: any) {
    const { titular, noTarjeta, fechaExp, cvv } = tarjeta;

    this.accion = 'editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular,
      noTarjeta,
      fechaExp,
      cvv,
    });
  }

  eliminarTarjeta(index: number) {
    this._tarjetaService.deleteTarjeta(index).subscribe(
      (data) => {
        this.toastr.error(
          `La tarjeta ${this.listTarjetas[index].noTarjeta} ha sido eliminada`,
          '¡Tarjeta Eliminada!'
        );
        this.obtenerTarjetas();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
