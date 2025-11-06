/* shop.tsx*/
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const allProducts = [
  // Accessories
  { id: 1, name: "Premium Watch Collection", price: 299.99, image: product1, rating: 5, reviews: 128, category: "accessories" },
  { id: 5, name: "Minimalist Watch", price: 259.99, image: product1, rating: 5, reviews: 73, category: "accessories" },
  { id: 7, name: "Sport Watch Elite", price: 329.99, image: product1, rating: 5, reviews: 156, category: "accessories" },
  { id: 11, name: "Smart Watch X", price: 399.99, image: product1, rating: 5, reviews: 203, category: "accessories" },
  { id: 13, name: "Classic Timepiece", price: 279.99, image: product1, rating: 5, reviews: 89, category: "accessories" },
  { id: 15, name: "Luxury Chronograph", price: 449.99, image: product1, rating: 5, reviews: 167, category: "accessories" },

  // Fashion
  { id: 2, name: "Designer Leather Bag", price: 189.99, image: product2, rating: 5, reviews: 96, category: "fashion" },
  { id: 6, name: "Classic Handbag", price: 219.99, image: product2, rating: 5, reviews: 91, category: "fashion" },
  { id: 8, name: "Vintage Messenger Bag", price: 169.99, image: product2, rating: 5, reviews: 67, category: "fashion" },
  { id: 12, name: "Canvas Tote Bag", price: 89.99, image: product2, rating: 5, reviews: 54, category: "fashion" },
  { id: 14, name: "Crossbody Bag", price: 149.99, image: product2, rating: 5, reviews: 78, category: "fashion" },
  { id: 16, name: "Evening Clutch", price: 129.99, image: product2, rating: 5, reviews: 62, category: "fashion" },

  // Eyewear
  { id: 3, name: "Luxury Sunglasses", price: 149.99, image: product3, rating: 5, reviews: 84, category: "eyewear" },
  { id: 9, name: "Aviator Sunglasses", price: 199.99, image: product3, rating: 5, reviews: 98, category: "eyewear" },
  { id: 17, name: "Wayfarer Frames", price: 179.99, image: product3, rating: 5, reviews: 112, category: "eyewear" },
  { id: 19, name: "Sport Sunglasses", price: 159.99, image: product3, rating: 5, reviews: 71, category: "eyewear" },
  { id: 21, name: "Cat-Eye Sunglasses", price: 189.99, image: product3, rating: 5, reviews: 93, category: "eyewear" },
  { id: 23, name: "Round Vintage Frames", price: 169.99, image: product3, rating: 5, reviews: 86, category: "eyewear" },

  // Footwear
  { id: 4, name: "Premium Sneakers", price: 179.99, image: product4, rating: 5, reviews: 112, category: "footwear" },
  { id: 10, name: "Running Shoes Pro", price: 159.99, image: product4, rating: 5, reviews: 142, category: "footwear" },
  { id: 18, name: "Classic Trainers", price: 139.99, image: product4, rating: 5, reviews: 97, category: "footwear" },
  { id: 20, name: "High-Top Sneakers", price: 199.99, image: product4, rating: 5, reviews: 128, category: "footwear" },
  { id: 22, name: "Casual Slip-Ons", price: 119.99, image: product4, rating: 5, reviews: 74, category: "footwear" },
  { id: 24, name: "Athletic Performance", price: 209.99, image: product4, rating: 5, reviews: 156, category: "footwear" },
];

const categories = [
  { id: "accessories", label: "Accessories" },
  { id: "fashion", label: "Fashion" },
  { id: "eyewear", label: "Eyewear" },
  { id: "footwear", label: "Footwear" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  // Initialize selected categories from URL on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      setSelectedCategories([categoryParam]);
    }
  }, []);

  // Update URL when categories change
  useEffect(() => {
    if (selectedCategories.length === 1) {
      searchParams.set("category", selectedCategories[0]);
      setSearchParams(searchParams, { replace: true });
    } else if (selectedCategories.length === 0) {
      searchParams.delete("category");
      setSearchParams(searchParams, { replace: true });
    }
  }, [selectedCategories]);

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return matchesPrice && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "popular") return b.reviews - a.reviews;
      return 0;
    });

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Shop All Products</h1>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {allProducts.length} products
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="relative">
            {/* Mobile Overlay */}
            <div
              className={`
      fixed inset-0 z-50 lg:hidden
      transition-transform duration-300 ease-in-out
      ${showFilters ? "translate-x-0" : "-translate-x-full"}
    `}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowFilters(false)}
              ></div>

              {/* Sliding panel */}
              <div className="relative w-64 h-full bg-white p-6 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <Button variant="ghost" onClick={() => setShowFilters(false)}>
                    Close
                  </Button>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <label
                          htmlFor={category.id}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setSelectedCategories([]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Price Filter */}
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <label
                          htmlFor={category.id}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setSelectedCategories([]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </aside>


          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No products found matching your filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setSelectedCategories([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
