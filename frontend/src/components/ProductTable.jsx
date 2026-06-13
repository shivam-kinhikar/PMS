import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import {
  lightTheme,
  darkTheme,
} from "../theme/theme";

function ProductTable({
  products,
  role,
  navigate,
  handleDelete,
}) {
  const { themeMode } = useTheme();

  const theme =
    themeMode === "light"
      ? lightTheme
      : darkTheme;

  return (
    <div
      style={{
        background: theme.card,
        borderRadius: "16px",
        padding: "20px",
        marginTop: "20px",
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.15)",
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: "850px",
          borderCollapse: "collapse",
          color: theme.text,
        }}
      >
        <thead>
          <tr>
            <th align="left">Image</th>
            <th align="left">Name</th>
            <th align="left">Price</th>
            <th align="left">Category</th>
            <th align="left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              style={{
                borderTop: `1px solid ${theme.border}`,
              }}
            >
              <td style={{ padding: "20px 0" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </td>

              <td
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {product.name}
              </td>

              <td
                style={{
                  color: "#ff8c66",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                ₹{product.price}
              </td>

              <td>
                <span
                  style={{
                    background:
                      themeMode === "light"
                        ? "#e0f2fe"
                        : "#1e293b",

                    color:
                      themeMode === "light"
                        ? "#0369a1"
                        : "#38bdf8",

                    padding: "8px 14px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {product.category}
                </span>
              </td>

              <td>
                {role === "admin" && (
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/products/edit/${product._id}`
                        )
                      }
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        width: "42px",
                        height: "42px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <FiEdit2 size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        width: "42px",
                        height: "42px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;