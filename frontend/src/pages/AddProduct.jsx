import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { useTheme } from "../context/ThemeContext";
import {
  lightTheme,
  darkTheme,
} from "../theme/theme";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { themeMode } = useTheme();

  const theme =
    themeMode === "light"
      ? lightTheme
      : darkTheme;

  const uploadImage = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "image",
        image
      );

      const response =
        await api.post(
          "/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return response.data.imageUrl;
    } catch (error) {
      console.error(error);
      return "";
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

    setError("");

    try {
      const token =
        localStorage.getItem("token");

      const imageUrl = image
        ? await uploadImage()
        : "";

      await api.post(
        "/products",
        {
          name,
          price,
          category,
          image: imageUrl,
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
        error.response?.data
          ?.message ||
          "Failed to create product"
      );
    }
  };

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
            Add Product
          </h1>

          <p
            style={{
              color:
                theme.secondaryText,
            }}
          >
            Create and manage new
            products
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
                placeholder="Enter product name"
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
                placeholder="Enter price"
                style={inputStyle}
              />
            </div>

            <div
              style={{
                marginBottom: "20px",
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
                placeholder="Enter category"
                style={inputStyle}
              />
            </div>

            <div
              style={{
                marginBottom: "25px",
              }}
            >
              <label>
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files[0]
                  )
                }
                style={{
                  marginTop: "12px",
                  color: theme.text,
                }}
              />

              {image && (
                <div
                  style={{
                    marginTop: "15px",
                  }}
                >
                  <img
                    src={URL.createObjectURL(
                      image
                    )}
                    alt="Preview"
                    style={{
                      width: "180px",
                      borderRadius:
                        "12px",
                    }}
                  />
                </div>
              )}
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
              Create Product
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddProduct;