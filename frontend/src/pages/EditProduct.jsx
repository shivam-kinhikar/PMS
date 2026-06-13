import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

import { useTheme } from "../context/ThemeContext";
import {
  lightTheme,
  darkTheme,
} from "../theme/theme";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { themeMode } = useTheme();

  const theme =
    themeMode === "light"
      ? lightTheme
      : darkTheme;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName(response.data.name);
      setPrice(response.data.price);
      setCategory(response.data.category);
    } catch (error) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !price ||
      !category.trim()
    ) {
      setError(
        "All fields are required"
      );
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      await api.put(
        `/products/${id}`,
        {
          name,
          price,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/products");
    } catch (error) {
      setError(
        "Failed to update product"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h2>Loading Product...</h2>
      </DashboardLayout>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: `1px solid ${theme.border}`,
    background: theme.card,
    color: theme.text,
    outline: "none",
    marginTop: "8px",
  };

  return (
    <DashboardLayout>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: theme.text,
              marginBottom: "8px",
            }}
          >
            Edit Product
          </h1>

          <p
            style={{
              color:
                theme.secondaryText,
            }}
          >
            Update existing product
            information
          </p>
        </div>

        <div
          style={{
            background: theme.card,
            padding: "30px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          {error && (
            <div
              style={{
                background:
                  "#ef444420",
                color: "#ef4444",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
          >
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <label>
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <label>Price</label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            <div
              style={{
                marginBottom: "25px",
              }}
            >
              <label>
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background:
                  "#ff8c66",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditProduct;