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
        icon: "ri-user-settings-line", 
    },
    {
        id: 3,
        title: "Profile",
        name: "Profile",
        path: "/profile",
        icon: "ri-user-line", 
    },
];

export const userDashboardDate = [
    {
        id: 1,
        title: "Dashboard",
        name: "Dashboard",
        path: "/dashboard",
        icon: "ri-bar-chart-line", 
    },
    {
        id: 3,
        title: "Profile",
        name: "Profile",
        path: "/profile",
        icon: "ri-user-line", 
    },
];


export const getRoleWiseMenu = (role: string) => {
    if (role === "Admin") return adminDashboardData;
    if (role === "User") return userDashboardDate;
    return [];
};
