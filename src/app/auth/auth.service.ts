import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { User } from "./user.model";
import { environment } from '../../environments/environment';

export interface AuthResponse {
    idToken:        string;     //  A Firebase Auth ID token for the newly created user.
    email:	        string;	    //  The email for the newly created user.
    refreshToken:	string;     //	A Firebase Auth refresh token for the newly created user.
    expiresIn:	    string;	    //  The number of seconds in which the ID token expires.
    localId:	    string;	    //  The uid of the newly created user.
    registered:     boolean;    //  Whether the email is for an existing account.
}

@Injectable({providedIn: 'root'})
export class AuthService {

    userSub = new BehaviorSubject<User>(null);
    tokenExpirationTimeout: any;

    constructor(private http: HttpClient, private router: Router) {}
    
    signup(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(this.handleAuthentication.bind(this))
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(this.handleAuthentication.bind(this))
        );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        )

        this.userSub.next(loadedUser);
        const expiresIn = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expiresIn);
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimeout = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    logout() {
        this.userSub.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimeout) {
            clearTimeout(this.tokenExpirationTimeout);
            this.tokenExpirationTimeout = null;
        }
    }

    private handleAuthentication(resData: AuthResponse) {
        const tokenExpirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            tokenExpirationDate
        );
        this.userSub.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unexpected error occured';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS': 
                        errorMessage = 'The email address is already in use by another account.';
                        break;
            case 'INVALID_PASSWORD':
                        errorMessage = 'The password is invalid or the user does not have a password.'
        }
        return throwError(errorMessage);
    }

}