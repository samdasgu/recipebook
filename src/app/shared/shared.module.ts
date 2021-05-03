import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropDownDirective } from "./directives/dropdown.directive";

@NgModule({
    declarations:[
        AlertComponent,
        DropDownDirective
    ],
    imports:[
        CommonModule
    ],
    exports: [
        AlertComponent,
        DropDownDirective,
        CommonModule
    ]

})
export class SharedModule {

}