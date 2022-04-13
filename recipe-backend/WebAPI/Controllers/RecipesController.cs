using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Persistence;
using Services;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeService recipeService;

        public RecipesController(RecipeService service)
        {
            recipeService = service;
        }

        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DRecipe>> GetRecipe(int id)
        {
            DRecipe result = await recipeService.GetRecipeById(id);
            return new ActionResult<DRecipe>(result); 
        }

        // PUT: api/Recipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            //_context.Entry(recipe).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!RecipeExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return NoContent();
        }


        [HttpPut("filter")]
        public ActionResult<DRecipe[]> Filter(RecipeFilter recipeFilter ,int pageNumber = 1, int pageSize = 20)
        {
            var result = recipeService.FilterRecipes(recipeFilter, pageNumber, pageSize);
            return new ActionResult<DRecipe[]>(result);
        }

        // POST: api/Recipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe(Recipe recipe)
        {
            //_context.Recipes.Add(recipe);
            //await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipe", new { id = recipe.Id }, recipe);
        }

        // DELETE: api/Recipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            //var recipe = await _context.Recipes.FindAsync(id);
            //if (recipe == null)
            //{
            //    return NotFound();
            //}

            //_context.Recipes.Remove(recipe);
            //await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
