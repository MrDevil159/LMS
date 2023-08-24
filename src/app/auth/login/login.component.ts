import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public authService: AuthService, private router: Router) {}

  onSignIn(email: string, password: string) {
    this.authService.signIn(email, password).subscribe({
      next: (data: any) => {
        console.log('Signning In....');
        this.authService.fetchUserDataByEmail(email).subscribe({
          next: (data: any) => {
            console.log('Fetching Auth Data...');
            if(this.authService.isAdmin()) {
              this.router.navigate(['/users']);
            } else {
              this.router.navigate(['/leaves']);
            }
          },
          error: (error: any) => console.log(error),
        });
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log('login process finished');
      },
    });

  }
}
