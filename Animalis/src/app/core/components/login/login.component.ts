import { AuthService } from '../../../shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService) { 
    
  }

  login(providerName: string) {
    this.auth.login(providerName);
  }

  fbLogin(){
    this.login("facebook");
  }

  googleLogin(){
    this.login("google");
  }

  anonymousLogin() {
    this.login(null);
  }
}
