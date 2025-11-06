import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/context/CartContext";


interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
}

const ProductCard = ({ id, name, price, image, rating = 5, reviews = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();


  return (
    <Link to={`/product/${id}`}>
      <div
        className="group relative overflow-hidden rounded-lg bg-card transition-all duration-300 hover:shadow-medium"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-card-foreground mb-1 line-clamp-1">{name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < rating ? "fill-accent text-accent" : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">${price.toFixed(2)}</span>
            
            <Button
              size="sm"
              variant={isHovered ? "default" : "ghost"}
              className={`transition-all duration-300 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              }`}
              onClick={(e) => {
                e.preventDefault(); 
                addToCart({ id, name, price, image });
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
