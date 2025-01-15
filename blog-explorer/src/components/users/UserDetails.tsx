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

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const user = data.user;
  const filteredPosts = user.posts.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-primary mb-4">
          {user.firstname} {user.lastname}
        </h2>
        <p className="text-gray-600">Email: {user.email}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">
          Posts de l'utilisateur
        </h3>

        <input
          type="text"
          placeholder="Rechercher un post..."
          className="w-full p-2 border rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {filteredPosts.map((post: any) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-primary">
                {post.title}
              </h4>
              <p className="text-gray-600 line-clamp-2">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
