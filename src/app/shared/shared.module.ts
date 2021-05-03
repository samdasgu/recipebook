import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ANIMATION_TYPES, LoadingModule } from "ngx-loading";
import { AlertComponent } from "./alert/alert.component";
import { DropDownDirective } from "./directives/dropdown.directive";

@NgModule({
    declarations:[
        AlertComponent,
        DropDownDirective
    ],
    imports:[
        CommonModule,
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.circleSwish,
            backdropBackgroundColour: 'rgba(0,0,0,0.3)',
            backdropBorderRadius: '0px',
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
          }),
    ],
    exports: [
        AlertComponent,
        DropDownDirective,
        LoadingModule,
        CommonModule
    ]

})
export class SharedModule {

}