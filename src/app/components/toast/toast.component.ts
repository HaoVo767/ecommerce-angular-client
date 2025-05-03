import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastProvider } from '@/providers/toastProvider';

@Component({
  selector: 'toast-component',
  templateUrl: './toast.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class Toast implements OnChanges {
  constructor(private toastProvide: ToastProvider) {}

  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 2;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Input()
  isShow: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isShow']) {
      if (this.isShow) {
        this._snackBar.open(
          this.toastProvide.message(),
          this.toastProvide.status(),
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          }
        );
      }
    }
  }
}
