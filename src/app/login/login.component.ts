import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login', templateUrl: './login.component.html', styles: []
})
export class LoginComponent {
    message: string | null = null;
    name: string;
    password: string;

    constructor(public authService: AuthService, private router: Router) {
    }

    login() {
        this.message = 'Tentative de connexion en cours...';
        this.authService.login(this.name, this.password)
            .subscribe((res) => {
                if (res.isOk()) {
                    this.router.navigate(['/pokemons']);
                } else {
                    this.message = "Echec de l'authentification";
                }
            })
    }

    signup() {
        this.router.navigate(['/signup']);
    }
}
