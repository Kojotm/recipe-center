namespace Models
{
    public class NutritionInfo
    {
        public int Id { get; set; }
        public double Carbohydrates { get; set; }
        public double Protein { get; set; }
        public double Fats { get; set; }

        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}
