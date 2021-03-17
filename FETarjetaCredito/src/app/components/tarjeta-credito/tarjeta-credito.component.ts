import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [
    {
      titular: 'Juan Pérez',
      noTarjeta: '1235363296587452',
      fechaExp: '05/20',
      cvv: '123',
    },
    {
      titular: 'José Martinez',
      noTarjeta: '8549526724157412',
      fechaExp: '05/23',
      cvv: '155',
    },
  ];

  form: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
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

  ngOnInit(): void {}

  agregarTarjeta(): void {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      noTarjeta: this.form.get('noTarjeta')?.value,
      fechaExp: this.form.get('fechaExp')?.value,
      cvv: this.form.get('cvv')?.value,
    };
    this.listTarjetas.push(tarjeta);
    this.toastr.success(
      `La tarjeta de ${tarjeta.titular} ha sido agregada exitosamente`,
      '¡Tarjeta registrada!'
    );
    this.form.reset();

    console.log(tarjeta);
  }

  eliminarTarjeta(index: number) {
    this.toastr.error(
      `La tarjeta ${this.listTarjetas[index].noTarjeta} ha sido eliminada`,
      '¡Tarjeta Eliminada!'
    );
    this.listTarjetas.splice(index, 1);
  }
}
