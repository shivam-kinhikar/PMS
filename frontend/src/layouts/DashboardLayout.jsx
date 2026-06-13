import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { useTheme } from "../context/ThemeContext";
import {
    lightTheme,
    darkTheme,
} from "../theme/theme";

function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const { themeMode } = useTheme();

    const theme =
        themeMode === "light"
            ? lightTheme
            : darkTheme;

    return (
        <>
            <Navbar
                toggleSidebar={() =>
                    setSidebarOpen(!sidebarOpen)
                }
            />

            <div
                style={{
                    display: "flex",
                    minHeight: "calc(100vh - 74px)",
                }}
            >
                <Sidebar
                    sidebarOpen={sidebarOpen}
                />

                <main
                    style={{
                        flex: 1,
                        padding: "30px",
                        backgroundColor: theme.background,
                        color: theme.text,
                        transition: "all 0.3s ease",
                        minHeight: "calc(100vh - 74px)",
                    }}
                >
                    {children}
                </main>
            </div>
        </>
    );
}

export default DashboardLayout;