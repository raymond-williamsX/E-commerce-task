/* productDetail.tsx*/
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart, Heart, Minus, Plus, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCarousel from "@/components/ProductCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const relatedProducts = [
  { id: 5, name: "Minimalist Watch", price: 259.99, image: product1, rating: 5, reviews: 73 },
  { id: 6, name: "Classic Handbag", price: 219.99, image: product2, rating: 5, reviews: 91 },
  { id: 7, name: "Sport Sunglasses", price: 179.99, image: product3, rating: 5, reviews: 65 },
  { id: 8, name: "Casual Sneakers", price: 159.99, image: product4, rating: 5, reviews: 88 },
];

const reviews = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    date: "2 weeks ago",
    content: "Excellent quality and fast shipping. Highly recommend!",
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 5,
    date: "1 month ago",
    content: "Love this product! Exactly as described and worth every penny.",
  },
  {
    id: 3,
    author: "Mike Johnson",
    rating: 4,
    date: "1 month ago",
    content: "Great product, though shipping took a bit longer than expected.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const productImages = [product1, product1, product1, product1];

  const product = {
    id: Number(id),
    name: "Premium Watch Collection",
    price: 299.99,
    rating: 5,
    reviews: 128,
    description:
      "Elevate your style with our Premium Watch Collection. Crafted with precision and attention to detail, this timepiece combines classic elegance with modern functionality. Featuring a stainless steel case, scratch-resistant sapphire crystal, and a precision quartz movement, this watch is built to last.",
    features: [
      "Stainless steel case and band",
      "Scratch-resistant sapphire crystal",
      "Water-resistant up to 100m",
      "Precision quartz movement",
      "2-year warranty",
    ],
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div>
            <div
              className="relative aspect-square mb-4 bg-muted rounded-lg overflow-hidden cursor-zoom-in group"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
              />
              <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-5 w-5" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-accent"
                      : "border-transparent hover:border-muted-foreground/20"
                  }`}
                >
                  <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating ? "fill-accent text-accent" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="text-4xl font-bold mb-8">${product.price}</div>

            <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
              <TabsTrigger
                value="additional"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3"
              >
                Additional Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="py-8">
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Each piece in our Premium Watch Collection represents the perfect marriage of form and
                  function. Our master craftsmen have spent countless hours perfecting every detail, from
                  the smooth sweep of the second hand to the satisfying click of the clasp.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="py-8">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{review.author}</h4>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="additional" className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Shipping</h4>
                  <p className="text-muted-foreground">Free shipping on orders over $100</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Returns</h4>
                  <p className="text-muted-foreground">30-day return policy</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Warranty</h4>
                  <p className="text-muted-foreground">2-year manufacturer warranty</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Care Instructions</h4>
                  <p className="text-muted-foreground">Wipe clean with soft cloth</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <section>
          <ProductCarousel products={relatedProducts} title="Related Products" />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
