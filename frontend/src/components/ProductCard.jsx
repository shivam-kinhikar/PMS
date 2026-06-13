import { useState } from "react";
import "../styles/productCard.css";
import { useTheme } from "../context/ThemeContext";
import {
  lightTheme,
  darkTheme,
} from "../theme/theme";

function ProductCard({
  product,
  role,
  navigate,
  handleDelete,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const { themeMode } = useTheme();

  const theme =
    themeMode === "light"
      ? lightTheme
      : darkTheme;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: theme.card,
        color: theme.text,
        transform: isHovered
          ? "translateY(-8px)"
          : "translateY(0)",
        boxShadow: isHovered
          ? "0 15px 30px rgba(0,0,0,0.18)"
          : "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      )}

      <div className="product-content">
        <h3 className="product-title">
          {product.name}
        </h3>

        <p>
          <strong>Price:</strong> ₹{product.price}
        </p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        {role === "admin" && (
          <div className="product-actions">
            <button
              className="edit-btn"
              onClick={() =>
                navigate(
                  `/products/edit/${product._id}`
                )
              }
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                handleDelete(product._id)
              }
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;