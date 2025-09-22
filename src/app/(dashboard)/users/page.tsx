"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "@mui/material";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", username: "" });
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState({
    name: "",
    email: "",
    username: "",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Search
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  // Sort
  const handleSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sorted);
  };

  const handleCreate = () => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUserData = { id, ...newUser };
    setUsers([...users, newUserData]);
    setFilteredUsers([...filteredUsers, newUserData]);
    setNewUser({ name: "", email: "", username: "" });
    setIsModalOpen(false);
  };

  const handleUpdate = (id: number) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...editingUser } : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setEditingUserId(null);
    setEditingUser({ name: "", email: "", username: "" });
  };

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };


  const SortArrow = ({ columnKey }: { columnKey: keyof User }) => {
    if (!sortConfig || sortConfig.key !== columnKey) return null; 
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
         style={{border:"1px solid rgba(0,0,0,.3)"}}
          type="text"
          placeholder="Search users..."
          className="outline-0 p-2 rounded w-[250px] text-[12px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          size="small"
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Create User
        </Button>
      </div>

      <div className="table-responsive">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="">
              {["id", "name", "email", "username"].map((key) => (
                <th
                  key={key}
                  className=" px-4 py-2 text-left"
                  onClick={() => handleSort(key as keyof User)}
                >
                  {key.toUpperCase()}
                  <SortArrow columnKey={key as keyof User} />
                </th>
              ))}
              <th className=" px-4 py-2 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className=" ">{user.id}</td>
                {editingUserId === user.id ? (
                  <>
                    <td className=" px-4 py-2">
                      <input 
                        style={{border:"1px solid rgba(0,0,0,.3)",width:"250px",outline:"none"}}
                        className=" p-1 rounded"
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className=" px-4 py-2">
                      <input
                       style={{border:"1px solid rgba(0,0,0,.3)",width:"250px",outline:"none"}}
                        className=" p-1 rounded w-full"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className=" px-4 py-2">
                      <input 
                      style={{border:"1px solid rgba(0,0,0,.3)",width:"250px",outline:"none"}}
                        className=" p-1 rounded w-full"
                        value={editingUser.username}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            username: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className=" px-4 py-2 space-x-2 text-end">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleUpdate(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                        onClick={() => setEditingUserId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className=" px-4 py-2">{user.name}</td>
                    <td className=" px-4 py-2">{user.email}</td>
                    <td className=" px-4 py-2">{user.username}</td>
                    <td className=" px-4 py-2 space-x-2 text-end">
                      <button
                        onClick={() => {
                          setEditingUserId(user.id);
                          setEditingUser({
                            name: user.name,
                            email: user.email,
                            username: user.username,
                          });
                        }}
                      >
                        <i className="ri-edit-fill text-yellow-500 cursor-pointer text-[16px]"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                      >
                        <i className="ri-delete-bin-5-fill text-red-500 text-[16px] cursor-pointer"></i>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody> 
        </table>
      </div>




            <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
          <div className="mx-auto  flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Create User</h2>
            <input
             style={{border:"1px solid rgba(0,0,0,.3)",outline:"none"}}
              type="text"
              placeholder="Name"
              className="border p-2 rounded w-full mb-2 text-[12px]"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
            style={{border:"1px solid rgba(0,0,0,.3)",outline:"none"}}
              type="text"
              placeholder="Email"
              className="border p-2 rounded w-full mb-2 text-[12px]"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              style={{border:"1px solid rgba(0,0,0,.3)",outline:"none"}}
              type="text"
              placeholder="Username"
              className="border p-2 rounded w-full mb-4 text-[12px]"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <div className="flex gap-2 justify-end">
              <Button  
                size="small"
                variant="outlined"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="contained"
                 size="small"
                className="text-[12px]"
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </div>
          </div>
      </Modal>
    </div>
  );
};

export default Page;
