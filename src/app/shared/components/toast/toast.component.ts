import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services';
import { IToast } from '../../models';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.sass'],
})
export class ToastComponent implements OnInit {
  public toast: IToast = {
    text: 'Debes ingresar tu turno',
    show: false,
  };
  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToastObservable().subscribe({
      next: (currentState) => {
        this.toast = currentState;
      },
    });
  }
}
