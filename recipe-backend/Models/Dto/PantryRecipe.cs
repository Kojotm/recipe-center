using System.Collections.Generic;

namespace Models.Dto
{
    public class PantryRecipe
    {
        public DRecipe Recipe { get; set; }
        public List<string> FoundIngredients { get; set; }
    }
}
