import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ApolloProvider } from "@apollo/client";
import Navbar from "./components/Navbar";
import { client } from "./apollo/client";
import UsersList from "./components/users/UsersList";
import UserDetails from "./components/users/UserDetails";
import PostsList from "./components/posts/PostsList";
import PostDetails from "./components/posts/PostDetails";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<UsersList />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/posts" element={<PostsList />} />
              <Route path="/posts/:id" element={<PostDetails />} />
            </Routes>

            {/* <Routes>
              <Route path="/" element={<UsersList />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/posts" element={<PostsList />} />
              <Route path="/posts/:id" element={<PostDetails />} />
            </Routes> */}
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
