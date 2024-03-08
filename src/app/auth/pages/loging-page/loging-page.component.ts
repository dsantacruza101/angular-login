import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-loging-page',
  templateUrl: './loging-page.component.html',
  styleUrl: './loging-page.component.css'
})
export class LogingPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )

  public myForm: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]],
  });


  login() {
    const { email, password } = this.myForm.value;

    this.authService.login( email, password )
      .subscribe({
        next: () => this.redirecToDashboard(),
        error: (err) => {
          Swal.fire('Error', err, 'error');
        }

      })
  }

  redirecToDashboard():void {
    this.router.navigateByUrl('/dashboard')
  }

}
