export const adminDashboardData = [
    {
        id: 1,
        title: "Dashboard",
        name: "Dashboard",
        path: "/dashboard",
        icon: "ri-dashboard-line",
    },
    {
        id: 2,
        title: "Manage Users",
        name: "Manage Users",
        path: "/users",
        icon: "ri-team-line",
    },
    { 
        id: 3,
        title: "Projects",
        name: "Projects",
        path: "/projects",
        icon: "ri-folder-4-line",
    },
    { 
        id: 4,
        title: "Products",
        name: "Products",
        path: "/products",
        icon: "ri-shopping-bag-3-line",
    },
    {
        id: 5,
        title: "Profile",
        name: "Profile",
        path: "/profile",
        icon: "ri-user-line",
    },
];

export const userDashboardData = [
    {
        id: 1,
        title: "Dashboard",
        name: "Dashboard",
        path: "/dashboard",
        icon: "ri-bar-chart-line",
    },
    {
        id: 2,
        title: "Profile",
        name: "Profile",
        path: "/profile",
        icon: "ri-user-line",
    },
];

export const getRoleWiseMenu = (role: string) => {
    if (role === "Admin") return adminDashboardData;
    if (role === "User") return userDashboardData;
    return [];
};
