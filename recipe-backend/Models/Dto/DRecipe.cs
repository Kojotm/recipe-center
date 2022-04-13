namespace Models
{
    public class DRecipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string[] Description { get; set; }
        public string[] Ingredients { get; set; }
        public string[] Categories { get; set; }
        public double? Calories { get; set; }
        public int? Servings { get; set; }
        public NutritionInfo NutritionInfo { get; set; }
        public int? DurationInMinutes { get; set; }
        public Difficulty Difficulty { get; set; }
    }
}
