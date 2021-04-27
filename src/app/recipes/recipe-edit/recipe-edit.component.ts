import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/model/ingredient.model';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private readonly route: ActivatedRoute,
    private readonly recipeService: RecipeService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'];
        this.editMode = this.recipeId !== undefined;
      }
    );

    this.initForm();
    if(this.editMode) {
      this.populateForm();
    }
  }

  initForm() {
    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(null, Validators.required),
      'imageURL': new FormControl(null, Validators.required),
      'description': new FormControl(null),
      'ingredients': new FormArray([])
    });
  }

  populateForm() {
    const recipe: Recipe = this.recipeService.getRecipeById(this.recipeId);
    this.recipeForm.patchValue({
      'recipeName': recipe.name,
      'imageURL': recipe.imagePath,
      'description': recipe.description
    });
    recipe.ingredients.forEach(
      (ingredient: Ingredient) => this.addIngredient(ingredient.name, ingredient.amount)
    );
  }

  addIngredient(name: string, amount: number) {
    const ingredientFormGroup = new FormGroup({
      'ingredientName': new FormControl(name, Validators.required),
      'ingredientAmount': new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (this.recipeForm.get('ingredients') as FormArray).push(ingredientFormGroup);
  }

  deleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  get ingredients(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    const recipe: Recipe = {
      id: this.recipeId,
      name: this.recipeForm.get('recipeName').value,
      imagePath: this.recipeForm.get('imageURL').value,
      description: this.recipeForm.get('description').value,
      ingredients: []
    };

    //Adding Ingredients
    this.ingredients.forEach(
      (ingredients: FormGroup) => {
        recipe.ingredients.push(new Ingredient(ingredients.value['ingredientName'],ingredients.value['ingredientAmount']));
      }
    );

    this.recipeService.addRecipe(recipe);
    this.router.navigate(['/recipes'], {relativeTo: this.route});

  }

  onCancel() {
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

}
