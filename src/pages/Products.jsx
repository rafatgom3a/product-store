import { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/fetchProducts';
import { fetchCategories } from '../services/fetchCategories';
import ProductCard from '../components/ProductCard';

const ITEMS_PER_PAGE = 9;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error('Could not load categories:', err));
  }, []);

  const query = useMemo(() => ({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(selectedCategories.length ? { category: selectedCategories.join(',') } : {}),
    ...(minPrice !== '' ? { minPrice } : {}),
    ...(maxPrice !== '' ? { maxPrice } : {}),
    ...(minRating > 0 ? { minRating } : {}),
    ...(sort ? { sort } : {}),
  }), [currentPage, search, selectedCategories, minPrice, maxPrice, minRating, sort]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError('');
    fetchProducts(query)
      .then((data) => {
        if (cancelled) return;
        setProducts(data.products || []);
        setTotal(data.total || 0);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || 'Could not load products. Check that the StoreHub backend is running.');
        setProducts([]);
        setTotal(0);
      })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [query]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const handleCategoryChange = (slug) => {
    setCurrentPage(1);
    setSelectedCategories((previous) => previous.includes(slug)
      ? previous.filter((item) => item !== slug)
      : [...previous, slug]);
  };
  const updateFilter = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (isLoading && products.length === 0) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800"><div className="text-center"><div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4" /><p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Fetching products...</p></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg space-y-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">Filters</h2>
            <div><label className="block text-sm font-semibold mb-1">Search</label><input type="text" placeholder="Search products..." className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700" value={search} onChange={updateFilter(setSearch)} /></div>
            <div><h3 className="font-semibold mb-2">Category</h3><div className="space-y-2 max-h-40 overflow-y-auto">{categories.length ? categories.map((category) => <label key={category.id || category._id} className="flex items-center gap-2"><input type="checkbox" checked={selectedCategories.includes(category.slug)} onChange={() => handleCategoryChange(category.slug)} /><span className="capitalize">{category.name}</span></label>) : <p className="text-sm text-gray-500">No categories yet.</p>}</div></div>
            <div><h3 className="font-semibold mb-2">Price Range</h3><div className="flex gap-2"><input type="number" min="0" placeholder="Min" className="w-full min-w-0 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700" value={minPrice} onChange={updateFilter(setMinPrice)} /><input type="number" min="0" placeholder="Max" className="w-full min-w-0 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700" value={maxPrice} onChange={updateFilter(setMaxPrice)} /></div></div>
            <div><label className="block text-sm font-semibold mb-1">Minimum Rating</label><select className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" value={minRating} onChange={(event) => { setMinRating(Number(event.target.value)); setCurrentPage(1); }}><option value={0}>Any</option><option value={1}>1★ & up</option><option value={2}>2★ & up</option><option value={3}>3★ & up</option><option value={4}>4★ & up</option><option value={5}>5★ only</option></select></div>
            <div><label className="block text-sm font-semibold mb-1">Sort By</label><select className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" value={sort} onChange={updateFilter(setSort)}><option value="">Default</option><option value="priceLow">Price: Low to High</option><option value="priceHigh">Price: High to Low</option><option value="ratingHigh">Rating: High to Low</option><option value="newest">Newest First</option></select></div>
            <button type="button" onClick={() => { setSearch(''); setSelectedCategories([]); setMinPrice(''); setMaxPrice(''); setMinRating(0); setSort(''); setCurrentPage(1); }} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Clear filters</button>
          </div>
        </aside>
        <section className="md:col-span-3">
          <div className="mb-6 flex justify-between items-center gap-3"><h2 className="text-2xl font-bold">Products</h2><p className="text-sm text-gray-600 dark:text-gray-300">Showing {products.length} of {total} {total === 1 ? 'item' : 'items'}</p></div>
          {error && <div role="alert" className="mb-5 rounded-lg border border-red-300 bg-red-50 text-red-700 p-4">{error}</div>}
          {isLoading ? <p className="py-10 text-center text-gray-500">Updating products...</p> : products.length === 0 ? <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-lg"><p className="text-lg">No products match the selected filters.</p></div> : <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id || product._id} product={{ ...product, id: product.id || product._id, rating: Number(product.rating || 0), thumbnail: product.thumbnail || product.images?.[0] || '' }} />)}</div>
            {totalPages > 1 && <div className="mt-10 flex flex-wrap justify-center gap-2"><button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50">Prev</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded ${currentPage === page ? 'bg-white dark:bg-gray-900 text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>{page}</button>)}<button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50">Next</button></div>}
          </>}
        </section>
      </div>
    </div>
  );
};

export default Products;
