import { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch recipe data from a free public API
  const searchRecipes = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>🍳 Recipe Finder</h1>
      <form onSubmit={searchRecipes} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a recipe (e.g., Chicken, Pasta, Soup)..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading recipes...</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '100%', borderRadius: '6px' }} />
            <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{recipe.strMeal}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Category: {recipe.strCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
}