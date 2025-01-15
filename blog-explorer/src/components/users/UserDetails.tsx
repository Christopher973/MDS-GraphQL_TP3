import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  GET_USER,
  UPDATE_USER,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from "../../graphql/queries";
import { useState } from "react";

export default function UserDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: parseInt(id!) },
  });

  // États pour les formulaires
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [userForm, setUserForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
  });

  // Mutations
  const [updateUser] = useMutation(UPDATE_USER);
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_USER, variables: { id: parseInt(id!) } }],
  });
  const [updatePost] = useMutation(UPDATE_POST);
  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_USER, variables: { id: parseInt(id!) } }],
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const user = data.user;
  const filteredPosts = user.posts.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gestionnaires d'événements
  const handleEditUser = () => {
    setIsEditingUser(true);
    setUserForm({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        variables: {
          id: parseInt(id!),
          ...userForm,
        },
      });
      setIsEditingUser(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({
        variables: {
          ...postForm,
          userId: parseInt(id!),
        },
      });
      setIsAddingPost(false);
      setPostForm({ title: "", content: "" });
    } catch (err) {
      console.error("Erreur lors de la création:", err);
    }
  };

  const handleUpdatePost = async (postId: number) => {
    try {
      await updatePost({
        variables: {
          id: postId,
          ...postForm,
        },
      });
      setEditingPost(null);
      setPostForm({ title: "", content: "" });
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      try {
        await deletePost({
          variables: { id: postId },
        });
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Section profil utilisateur */}
      <div className="bg-white p-6 rounded-lg shadow">
        {isEditingUser ? (
          <form onSubmit={handleUpdateUser} className="space-y-4">
            <input
              type="text"
              placeholder="Prénom"
              className="w-full p-2 border rounded"
              value={userForm.firstname}
              onChange={(e) =>
                setUserForm({ ...userForm, firstname: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Nom"
              className="w-full p-2 border rounded"
              value={userForm.lastname}
              onChange={(e) =>
                setUserForm({ ...userForm, lastname: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-white rounded"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setIsEditingUser(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {user.firstname} {user.lastname}
            </h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <button
              onClick={handleEditUser}
              className="mt-4 px-4 py-2 bg-secondary text-white rounded"
            >
              Modifier le profil
            </button>
          </div>
        )}
      </div>

      {/* Section posts */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-primary">
            Posts de l'utilisateur
          </h3>
          <button
            onClick={() => setIsAddingPost(true)}
            className="px-4 py-2 bg-secondary text-white rounded"
          >
            Ajouter un post
          </button>
        </div>

        {isAddingPost && (
          <form
            onSubmit={handleCreatePost}
            className="bg-white p-4 rounded-lg shadow space-y-4"
          >
            <input
              type="text"
              placeholder="Titre du post"
              className="w-full p-2 border rounded"
              value={postForm.title}
              onChange={(e) =>
                setPostForm({ ...postForm, title: e.target.value })
              }
            />
            <textarea
              placeholder="Contenu du post"
              className="w-full p-2 border rounded h-32"
              value={postForm.content}
              onChange={(e) =>
                setPostForm({ ...postForm, content: e.target.value })
              }
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-white rounded"
              >
                Publier
              </button>
              <button
                type="button"
                onClick={() => setIsAddingPost(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        <input
          type="text"
          placeholder="Rechercher un post..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {filteredPosts.map((post: any) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow">
              {editingPost === post.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={postForm.title}
                    onChange={(e) =>
                      setPostForm({ ...postForm, title: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full p-2 border rounded h-32"
                    value={postForm.content}
                    onChange={(e) =>
                      setPostForm({ ...postForm, content: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdatePost(post.id)}
                      className="px-4 py-2 bg-secondary text-white rounded"
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setEditingPost(null)}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-semibold text-primary">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mt-2">{post.content}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        setEditingPost(post.id);
                        setPostForm({
                          title: post.title,
                          content: post.content,
                        });
                      }}
                      className="px-3 py-1 bg-secondary text-white rounded text-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-3 py-1 bg-accent2 text-white rounded text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
