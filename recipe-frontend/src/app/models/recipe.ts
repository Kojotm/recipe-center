import { NutritionInfo } from "./nutritionInfo";

export interface Recipe {
    name?: string | undefined;
    description?: string[] | undefined;
    ingredients?: string[] | undefined;
    categories?: string[] | undefined;
    calories?: number | undefined;
    servings?: number | undefined;
    durationInMinutes?: number | undefined;
    nutritionInfo?: NutritionInfo;
}