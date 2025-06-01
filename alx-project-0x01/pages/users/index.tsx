import { UserData } from "@/interfaces";
import { useState } from "react";
import UserModal from "@/components/common/UserModal";

const Users = ({ users }: { users: UserData[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userList, setUserList] = useState<UserData[]>(users);

  const handleAddUser = (user: UserData) => {
    user.id = userList.length + 1;
    setUserList([...userList, user]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userList.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
            <p className="text-sm text-gray-600">{user.company.name}</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <UserModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return { props: { users } };
}

export default Users;
