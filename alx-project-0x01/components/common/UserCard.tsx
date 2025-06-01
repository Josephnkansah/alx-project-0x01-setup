import React, { useState } from "react";
import { UserData, UserModalProps } from "@/interfaces";

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState<UserData>({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setForm((prev) => {
      const updated = { ...prev };
      let pointer: any = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        pointer = pointer[keys[i]];
      }

      pointer[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="grid gap-3 max-h-[80vh] overflow-y-auto pr-2">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="border p-2 rounded" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
          <input name="address.street" placeholder="Street" value={form.address.street} onChange={handleChange} className="border p-2 rounded" />
          <input name="address.suite" placeholder="Suite" value={form.address.suite} onChange={handleChange} className="border p-2 rounded" />
          <input name="address.city" placeholder="City" value={form.address.city} onChange={handleChange} className="border p-2 rounded" />
          <input name="address.zipcode" placeholder="Zipcode" value={form.address.zipcode} onChange={handleChange} className="border p-2 rounded" />
          <input name="address.geo.lat" placeholder="Latitude" value={form.address.geo.lat} onChange={handleChange} className="border p-2 rounded" />
          <input name="address.geo.lng" placeholder="Longitude" value={form.address.geo.lng} onChange={handleChange} className="border p-2 rounded" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border p-2 rounded" />
          <input name="website" placeholder="Website" value={form.website} onChange={handleChange} className="border p-2 rounded" />
          <input name="company.name" placeholder="Company Name" value={form.company.name} onChange={handleChange} className="border p-2 rounded" />
          <input name="company.catchPhrase" placeholder="Catch Phrase" value={form.company.catchPhrase} onChange={handleChange} className="border p-2 rounded" />
          <input name="company.bs" placeholder="BS" value={form.company.bs} onChange={handleChange} className="border p-2 rounded" />

          <div className="flex justify-end gap-4 mt-2">
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-black">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;