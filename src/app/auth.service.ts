import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {ApiError, ApiResponse, ApiService, Ok} from "../api/api.service";
import {ApiToken} from "../api/model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private apiService: ApiService) {
    }

    get isLoggedIn(): boolean {
        return this.apiService.apiKey != null;
    }

    login(name: string, password: string): Observable<ApiResponse<ApiToken, ApiError>> {
        return this.apiService.login(name, password).pipe(map((response, _) => {
            if (response instanceof Ok<ApiToken>) {
                localStorage.setItem("apiToken", response.value.token);
            } else {
                localStorage.clear()
            }
            return response;
        }));
    }

    logout() {
        this.apiService.logout();
    }
}
