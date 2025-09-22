"use client"
import React from 'react';
import AdminDashboard from './_component/AdminDashboard';
import UserDashboard from './_component/UserDashboard';

const Page = () => {
    const role=localStorage.getItem('role')
    return (
        <div>
            {
                role==='Admin'&& <AdminDashboard />
            }
            {
                role==='User'&& <UserDashboard />
            }
            
        </div>
    );
};

export default Page;