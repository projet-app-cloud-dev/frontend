import {Component} from "@angular/core";
import {ApiService, Ok} from "../../../api/api.service";
import {Card} from "../../../api/model"; // Import pour effectuer les requêtes HTTP


@Component({
    selector: "app-afficher-carte", // Angular recommande les noms kebab-case pour les sélecteurs
    templateUrl: "./afficherCarte.component.html", styleUrls: [], // Utilisez un fichier CSS pour les styles (bonnes pratiques)
})
export class AfficherCarteComponent {
    cardImageUrl: string = ""; // URL de l'image de la carte
    errorMessage: string = ""; // Message d'erreur pour l'utilisateur

    constructor(private apiService: ApiService) {
    }

    /**
     * Recherche un Pokémon par son nom
     */
    searchPokemon(): void {
        const inputElement = document.getElementById("searchInput",) as HTMLInputElement;
        if (inputElement) {
            const searchValue = inputElement.value; // Nettoie les espaces inutiles
            if (searchValue) {
                this.apiService.getCard(Number.parseInt(searchValue)).subscribe((res) => {
                    if (res instanceof Ok<Card>) {
                        this.cardImageUrl = res.value.imageUrl;
                    } else {
                        this.errorMessage = "Erreur lors de la recherche. Veuillez vérifier le nom et réessayer.";
                    }
                })
            } else {
                this.errorMessage = "Le champ de recherche est vide.";
            }
        } else {
            console.error("Impossible de trouver l'élément d'entrée pour la recherche.",);
        }
    }
}