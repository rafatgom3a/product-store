import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/fetchProducts';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setCategories([...new Set(data.map((p) => p.category))]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (minPrice !== '') {
      result = result.filter((p) => p.price >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }

    if (minRating > 0) {
      result = result.filter((p) => {
        const rating = p.rating?.rate ?? p.rating;
        return rating >= minRating;
      });
    }

    if (sort === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'ratingHigh') {
      result.sort((a, b) => {
        const ratingA = a.rating?.rate ?? a.rating ?? 0;
        const ratingB = b.rating?.rate ?? b.rating ?? 0;
        return ratingB - ratingA;
      });
    } else if (sort === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    setFiltered(result);
  }, [products, search, selectedCategories, minPrice, maxPrice, minRating, sort]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Fetching products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1">
          <div className="sticky top-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg space-y-6 h-[calc(100vh-3rem)] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">Filters</h2>

            {/* Search */}
            <div>
              <label className="block text-sm font-semibold mb-1">Search</label>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-2">Category</h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span className="capitalize">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold mb-1">Minimum Rating</label>
              <select
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              >
                <option value={0}>Any</option>
                <option value={1}>1★ & up</option>
                <option value={2}>2★ & up</option>
                <option value={3}>3★ & up</option>
                <option value={4}>4★ & up</option>
                <option value={5}>5★ only</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold mb-1">Sort By</label>
              <select
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Default</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="ratingHigh">Rating: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Products */}
        <section className="md:col-span-3">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Showing {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-lg">No products match the selected filters.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;
