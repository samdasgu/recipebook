import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListItemComponent } from "./recipe-list/recipe-list-item/recipe-list-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesRoutes } from "./recipes.routes";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeListItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        RecipesRoutes,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class RecipesModule {

}