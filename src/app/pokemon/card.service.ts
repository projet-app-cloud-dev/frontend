import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CardService {
    private apiUrl = 'http://localhost:8080/cards'; // URL de votre API backend

    constructor(private http: HttpClient) {}

    // Méthode pour récupérer l'image d'une carte
    getCardImage(cardId: number): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/${cardId}/image`, { responseType: 'blob' });
    }
}
