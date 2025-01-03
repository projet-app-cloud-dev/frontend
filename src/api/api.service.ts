import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {environment} from '../environments/environment';
import {ApiToken, UsernameAndPassword} from "./model";
import {catchError, map, Observable, of} from "rxjs";

export type ApiResponse<T, E> = Ok<T> | Err<E>;

export class Ok<T> {

    constructor(public value: T) {
    }

    isOk(): boolean {
        return true;
    }

    isErr(): boolean {
        return false;
    }
}

export class Err<E> {
    constructor(public value: E) {
    }

    isOk(): boolean {
        return false;
    }

    isErr(): boolean {
        return true;
    }
}


export enum ApiError {
    ClientError, InvalidInput, NotFound, Other, Conflict
}

function mapError(err: HttpErrorResponse, _: any): Observable<Err<ApiError>> {
    if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error);
        return of(new Err(ApiError.ClientError))
    } else {
        let error = ApiError.Other;
        switch (err.status) {
            case 400:
                error = ApiError.InvalidInput;
                break;
            case 404:
                error = ApiError.NotFound;
                break;
            case 409:
                error = ApiError.Conflict;
                break;
        }
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        return of(new Err(error))
    }
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private _apiKey: null | string;

    public get apiKey(): string | null {
        return this._apiKey;
    }

    private set apiKey(value: string | null) {
        if (value != null) {
            localStorage.setItem("apiKey", value);
        } else {
            localStorage.removeItem("apiKey");
        }
        this._apiKey = value;
    }

    constructor(private httpClient: HttpClient) {
        this._apiKey = localStorage.getItem("apiKey");
    }

    login(username: string, password: string): Observable<ApiResponse<ApiToken, ApiError>> {
        return this.httpClient.post<ApiToken>(environment.apiUrl + "/auth/login", {
            username: username, password: password
        } as UsernameAndPassword)
            .pipe(map((api, _) => {
                this.apiKey = api.token;
                return new Ok(api);
            }), catchError(mapError))
    }

    signup(username: string, password: string) {
        return this.httpClient.post<ApiToken>(environment.apiUrl + "/auth/signup", {
            username: username, password: password
        } as UsernameAndPassword).pipe(map((api, _) => {
            this.apiKey = api.token;
            return new Ok(api);
        }), catchError(mapError))
    }

    logout() {
        this.apiKey = null;
    }
}
