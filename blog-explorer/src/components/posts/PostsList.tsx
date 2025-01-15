import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Post } from "../../types";

function formatDate(dateString: string | number) {
  try {
    // Conversion en millisecondes si nécessaire
    const timestamp =
      typeof dateString === "string" ? Number(dateString) : dateString;

    // Vérification de la validité du timestamp
    if (isNaN(timestamp)) {
      console.error("Timestamp invalide:", dateString);
      return "Date invalide";
    }

    const date = new Date(timestamp);

    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("Erreur de formatage:", error);
    return "Date invalide";
  }
}

export default function PostsList() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const filteredPosts = data.posts.filter((post: Post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    console.log("Nouveau tri:", newOrder); // Pour déboguer
  };

  const sortedPosts = [...filteredPosts].sort((a: Post, b: Post) => {
    try {
      const dateA = Number(a.created_at);
      const dateB = Number(b.created_at);

      if (isNaN(dateA) || isNaN(dateB)) {
        console.error("Date invalide:", { a: a.created_at, b: b.created_at });
        return 0;
      }

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } catch (error) {
      console.error("Erreur de tri:", error);
      return 0;
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">Liste des Posts</h2>

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
          onClick={handleSort}
        >
          Trier par date {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post: Post) => (
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
            <p className="text-sm text-gray-400">
              Le: {formatDate(post.created_at)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
