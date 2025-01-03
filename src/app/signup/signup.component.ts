import {Component} from '@angular/core';
import {ApiError, ApiService, Err} from "../../api/api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup', templateUrl: './signup.component.html', styles: []
})
export class SignupComponent {
    message: string | null = null;
    name: string;
    password: string;

    constructor(private apiService: ApiService, private router: Router) {
    }

    signup() {
        this.apiService.signup(this.name, this.password).subscribe((res) => {
            if (res instanceof Err<ApiError>) {
                if (res.value == ApiError.Conflict) {
                    this.message = "Le nom d'utilisateur est deja utilisé";
                } else {
                    this.message = "Échec de la création de compte";
                }
            } else {
                this.router.navigate(['/pokemons']);
            }
        });
    }

    login() {
        this.router.navigate(['/login']);
    }
}
