import { Difficulty } from "./difficulty";
import { NutritionInfo } from "./nutritionInfo";

export class Recipe {
    id: number | undefined;
    name?: string | undefined;
    description?: string[] | undefined;
    ingredients?: string[] | undefined;
    categories?: string[] | undefined;
    calories?: number | undefined;
    servings?: number | undefined;
    durationInMinutes?: number | undefined;
    nutritionInfoId?: number | null;
    nutritionInfo?: NutritionInfo;
    difficulty: Difficulty = Difficulty.None;
    addedByUser: boolean = false;
    image?: string | undefined;
    imgaeId?: number | null;
    ingredientsFound : string[] = [];
}
