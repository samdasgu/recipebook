import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(
    private readonly shoppingListService: ShoppingListService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipeById(+this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params: Params) => this.recipe = this.recipeService.getRecipeById(+params['id'])
    );
  }

  addIngredientsToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  navigateToEditRecipe() {
    this.router.navigate(['./edit'], {relativeTo: this.route});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

}
