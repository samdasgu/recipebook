import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../services/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    userSubscription: Subscription
    collapsed = true;
    isAuthenticated = false;

    constructor(
        private dataStorageService: DataStorageService,
        private loadingBarService: LoadingBarService,
        private authService: AuthService) { }

    ngOnInit() {
        this.userSubscription = this.authService.userSub.subscribe(user => this.isAuthenticated = !!user);
    }

    onSaveData() {
        this.loadingBarService.start();
        this.dataStorageService.storeRecipes()
            .subscribe(_ => this.loadingBarService.complete());
    }

    onFetchData() {
        this.loadingBarService.start();
        this.dataStorageService.fetchRecipes()
            .subscribe(_ => this.loadingBarService.complete());
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}