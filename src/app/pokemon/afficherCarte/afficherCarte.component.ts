import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Import pour effectuer les requêtes HTTP

interface Card {
    imageUrl: string;
}

@Component({
    selector: "app-afficher-carte", // Angular recommande les noms kebab-case pour les sélecteurs
    templateUrl: "./afficherCarte.component.html",
    styleUrls: [], // Utilisez un fichier CSS pour les styles (bonnes pratiques)
})
export class AfficherCarteComponent implements OnInit {
    cardId: number = 142; // ID de la carte à afficher
    cardImageUrl: string = ""; // URL de l'image de la carte
    errorMessage: string = ""; // Message d'erreur pour l'utilisateur
    apiUrl: string = "http://localhost:8080/api/v1"; // Base URL de votre API
    cards: any[] = []; // Liste des cartes récupérées via l'API
    selectedCard: any; // Carte actuellement sélectionnée pour afficher l'image

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        // Charger les cartes disponibles dès l'initialisation
        this.loadCards();
    }

    /**
     * Charge la liste des cartes via une requête HTTP
     */
    loadCards(): void {
        const query = ""; // Vous pouvez définir un paramètre de recherche ici si nécessaire
        const url = `${this.apiUrl}/cards/?query=${query}`;

        this.http.get(url).subscribe(
            (response: any) => {
                this.cards = response; // Stocke la liste des cartes dans `cards`
                this.errorMessage = ""; // Réinitialise les erreurs
                console.log("Cartes récupérées :", this.cards);
            },
            (error) => {
                console.error("Erreur lors du chargement des cartes :", error);
                this.errorMessage =
                    "Impossible de charger les cartes. Veuillez réessayer plus tard.";
            },
        );
    }

    /**
     * Recherche un Pokémon par son nom
     */
    searchPokemon(): void {
        const inputElement = document.getElementById(
            "searchInput",
        ) as HTMLInputElement;

        console.log("foo", inputElement);

        if (inputElement) {
            const searchValue = inputElement.value; // Nettoie les espaces inutiles

            if (searchValue) {
                const url = `${this.apiUrl}/cards/${searchValue}`;

                this.http.get<Card>(url).subscribe(
                    (results) => {
                        console.log("Résultats de la recherche :", results);
                        // TODO : Traitez et affichez les résultats dans l'interface utilisateur
                        this.cardImageUrl = results.imageUrl;
                    },
                    (error) => {
                        console.error("Erreur lors de la recherche du Pokémon :", error);
                        this.errorMessage =
                            "Erreur lors de la recherche. Veuillez vérifier le nom et réessayer.";
                    },
                );
            } else {
                this.errorMessage = "Le champ de recherche est vide.";
            }
        } else {
            console.error(
                "Impossible de trouver l'élément d'entrée pour la recherche.",
            );
        }
    }
}