import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";

interface UsernameAndPassword {
  username: string;
  password: string;
}

// @ts-ignore
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit{
  message: string = '';
  name: string;
  password: string;
  apiUrl: string = "http://localhost:8080/api/v1"; // Base URL de votre API
  logged : boolean = false;

  constructor(
      private http: HttpClient,
      private router: Router
  ) {}
  ngOnInit(){
  }



  // Méthode de connexion
  login() {
    this.message = 'Tentative de connexion en cours...';

    const url = `${this.apiUrl}/auth/login`; // Endpoint de l'API

    // Construire l'objet à envoyer dans la requête POST
    const user: UsernameAndPassword = {
      username: this.name,
      password: this.password
    };

    // Envoyer une requête POST avec les informations de connexion
    this.http.post(url, user).subscribe(
        (response: any) => {
          // Succès : traiter la réponse
          console.log('Connexion réussie !', response);
          this.logged = true;

          // Exemple : enregistrement du token dans le localStorage
          if (response && response.token) {
            localStorage.setItem('token', response.token);

            // Redirection vers une autre page après connexion
            this.router.navigate(['/afficherCartes']);
          } else {
            this.message = 'Connexion réussie, mais aucun token reçu.';
          }
        },
        (error) => {
          // Échec : afficher un message d'erreur
          console.error('Erreur lors de la connexion :', error);
          this.message = 'Échec de la connexion. Vérifiez vos identifiants.';
        }
    );
  }


  logout() {
    this.logged=false;
    this.message = 'Vous êtes déconnecté.'
  }

  signup() {
    this.message = 'Tentative de création de compte en cours...';

    const url = `${this.apiUrl}/signup`; // Endpoint pour l'inscription

    // Construire l'objet avec les informations de l'utilisateur
    const signupInformations: UsernameAndPassword = {
      username: this.name,
      password: this.password
    };

    // Envoyer une requête POST
    this.http.post(url, signupInformations).subscribe(
        (response: any) => {
          // Succès : traiter la réponse
          console.log('Compte créé avec succès !', response);

          // Enregistrement du token si fourni
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.message = 'Compte créé avec succès. Vous êtes maintenant connecté.';
            this.logged=true;
            // Redirection vers une autre page (par exemple, tableau de bord)
            this.router.navigate(['/afficherCartes']);
          } else {
            this.message = 'Compte créé, mais aucun token reçu.';
          }
        },
        (error) => {
          // Gestion des erreurs
          console.error('Erreur lors de la création du compte :', error);

          if (error.status === 400) {
            this.message = 'Requête invalide : Nom d\'utilisateur ou mot de passe manquant.';
          } else if (error.status === 409) {
            this.message = 'Nom d\'utilisateur déjà utilisé. Veuillez en choisir un autre.';
          } else {
            this.message = 'Erreur lors de la création du compte. Veuillez réessayer.';
          }
        }
    );
  }


}