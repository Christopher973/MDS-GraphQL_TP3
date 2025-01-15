import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries";
import { User } from "../../types";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UsersList() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const filteredUsers = data.users.filter((user: User) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a: User, b: User) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">
        Liste des Utilisateurs
      </h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="flex-1 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-opacity-90"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Trier par date {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedUsers.map((user: User) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-primary">
              {user.firstname} {user.lastname}
            </h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-400">
              Créé le : {new Date(user.created_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
