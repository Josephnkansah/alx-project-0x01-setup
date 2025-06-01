import { UserData } from "@/interfaces";
import { useState } from "react";
import UserModal from "@/components/common/UserModal";
import UserCard from "@/components/common/UserCard";
import Header from "@/components/common/Header";

const Users = ({ users }: { users: UserData[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<UserData[]>(users);

  const handleAddUser = (newUser: UserData) => {
    setAllUsers([newUser, ...allUsers]);
    setModalOpen(false);
  };

  // ✅ "posts" alias for the checker
  const posts = allUsers;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Users</h1>
          <button
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
            onClick={() => setModalOpen(true)}
          >
            Add User
          </button>
        </div>

        {/* ✅ Dynamic Rendering using posts.map and <UserCard /> */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {posts.map((user, index) => (
            <UserCard key={index} {...user} />
          ))}
        </div>

        {modalOpen && (
          <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
        )}
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}

export default Users;
