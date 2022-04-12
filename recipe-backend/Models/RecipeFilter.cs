namespace Models
{
    public class RecipeFilter
    {
        public string SearchPhrase { get; set; }
        public int MaxCalories { get; set; }
        public int MaxDurationInMinutes { get; set; }
        public int MinServings { get; set; }
    }
}
