import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Post } from "../../types";

export default function PostsList() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const filteredPosts = data.posts.filter((post: Post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">Liste des Posts</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un post..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post: Post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-primary">{post.title}</h3>
            <p className="text-gray-600 line-clamp-2">{post.content}</p>
            <p className="text-sm text-gray-400 mt-2">
              Par: {post.user.firstname} {post.user.lastname}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
