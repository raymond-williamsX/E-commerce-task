/* home.tsx*/
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCarousel from "@/components/ProductCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBanner from "@/assets/hero-banner.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const featuredProducts = [
  { id: 1, name: "Premium Watch Collection", price: 299.99, image: product1, rating: 5, reviews: 128 },
  { id: 2, name: "Designer Leather Bag", price: 189.99, image: product2, rating: 5, reviews: 96 },
  { id: 3, name: "Luxury Sunglasses", price: 149.99, image: product3, rating: 5, reviews: 84 },
  { id: 4, name: "Premium Sneakers", price: 179.99, image: product4, rating: 5, reviews: 112 },
  { id: 5, name: "Minimalist Watch", price: 259.99, image: product1, rating: 5, reviews: 73 },
  { id: 6, name: "Classic Handbag", price: 219.99, image: product2, rating: 5, reviews: 91 },
];

const categories = [
  { name: "Accessories", image: product1, link: "/shop?category=accessories" },
  { name: "Fashion", image: product2, link: "/shop?category=fashion" },
  { name: "Eyewear", image: product3, link: "/shop?category=eyewear" },
  { name: "Footwear", image: product4, link: "/shop?category=footwear" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    content: "Absolutely love the quality and attention to detail. Every purchase has exceeded my expectations!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Designer",
    content: "The curated collection is outstanding. I've found pieces here that I can't find anywhere else.",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Lifestyle Blogger",
    content: "Fast shipping, excellent customer service, and premium products. Highly recommended!",
    rating: 5,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[hsl(var(--hero-gradient-end))] opacity-90" />
        <img
          src={heroBanner}
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Elevate Your Style
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Discover premium fashion and lifestyle products crafted for the modern individual
            </p>
            <div className="flex gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-semibold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <ProductCarousel products={featuredProducts} title="Featured Products" />
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-soft animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-foreground"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
