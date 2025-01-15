import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER } from "../../graphql/queries";
import { useState } from "react";

export default function UserDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: parseInt(id!) },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const user = data.user;
  const filteredPosts = user.posts.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a: any, b: any) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-primary mb-4">
          {user.firstname} {user.lastname}
        </h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-500">
          Membre depuis: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">
          Posts de l'utilisateur
        </h3>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Rechercher un post..."
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

        <div className="grid gap-4 md:grid-cols-2">
          {sortedPosts.map((post: any) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-primary">
                {post.title}
              </h4>
              <p className="text-gray-600 line-clamp-2">{post.content}</p>
              <p className="text-sm text-gray-400 mt-2">
                Publié le: {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
