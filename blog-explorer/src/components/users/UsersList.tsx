import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries";
import { User } from "../../types";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UsersList() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const filteredUsers = data.users.filter((user: User) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">
        Liste des Utilisateurs
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user: User) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-primary">
              {user.firstname} {user.lastname}
            </h3>
            <p className="text-gray-600">{user.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
