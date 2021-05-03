import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponse, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl : './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    error: string = null;
    isSubmitted = false;
    isLoading = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
        // this.loadingService.useRef().start();
        this.isLoading = true;
        this.isSubmitted = true;
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponse>;
        if(this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe(
            resData => {
                this.isSubmitted = false;
                this.router.navigate(['/recipes']);
                this.isLoading = false;
                // this.loadingService.useRef().stop();
            },
            errorMessage => {
                this.error = errorMessage;
                this.isSubmitted = false;
                this.isLoading = false;
                // this.loadingService.useRef().stop();
            }
        );
        form.reset();
    }

    onHandleError() {
        this.error = null;
    }
}