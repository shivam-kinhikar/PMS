import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard";
import ProductTable from "../components/ProductTable";
import SearchBar from "../components/SearchBar";

import { useTheme } from "../context/ThemeContext";
import {
  lightTheme,
  darkTheme,
} from "../theme/theme";

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { role } = useAuth();
  const navigate = useNavigate();

  const { themeMode } = useTheme();

  const theme =
    themeMode === "light"
      ? lightTheme
      : darkTheme;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
    } catch (error) {
      setError("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (error) {
      alert("Failed to delete product");
      console.error(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  
    return (
  <DashboardLayout>
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100%",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <h1
          style={{
            color: theme.text,
            marginBottom: "8px",
            fontSize: "42px",
          }}
        >
          Products
        </h1>

        <p
          style={{
            color: theme.secondaryText,
            margin: 0,
          }}
        >
          Manage and organize your products
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <StatsCard
          title="Total Products"
          value={products.length}
        />

        <StatsCard
          title="Categories"
          value={
            new Set(
              products.map(
                (product) => product.category
              )
            ).size
          }
        />

        <StatsCard
          title="Current Role"
          value={role.toUpperCase()}
        />
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {filteredProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <ProductTable
          products={filteredProducts}
          role={role}
          navigate={navigate}
          handleDelete={handleDelete}
        />
      )}
    </div>
  </DashboardLayout>
  );
}

export default Products;