import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { GET_POST } from "../../graphql/queries";

export default function PostDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: parseInt(id!) },
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const post = data.post;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-primary mb-4">{post.title}</h2>

        <div className="mb-4">
          <Link
            to={`/users/${post.user.id}`}
            className="text-secondary hover:underline"
          >
            Par: {post.user.firstname} {post.user.lastname}
          </Link>
          <p className="text-gray-500">
            Publié le: {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>
    </div>
  );
}
