import { BrowserRouter, Routes, Route, Link } from "react-router";

import Layout from "./components/Layout/Layout";

import Test from "./components/Test";
import Home from "./components/Home";
import Chat from "./components/Chatting/Chat";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile/Profile";
import CreatePost from "./components/Posts/CreatePost";
import PostDetails from "./components/Posts/PostDetails";

import { SearchProvider } from "./contexts/SearchContext.jsx";

import "./css/site.css";

import ProtectedRoute from "./services/ProtectedRoute.jsx";
import Search from "./components/Search/Search.jsx";
import { ProfileProvider } from "./contexts/ProfileContext.jsx";
import CreateGallery from "./components/Gallery/CreateGallery.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />

					{/* Protected Chat Routes */}
					<Route
						path="/chat"
						element={
							<ProtectedRoute>
								<Chat />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/chat/:id"
						element={
							<ProtectedRoute>
								<Chat />
							</ProtectedRoute>
						}
					/>

					{/* Search */}
					<Route
						path="/search"
						element={
							<SearchProvider>
								<Search />
							</SearchProvider>
						}
					/>

					{/* Authorization */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Profile */}
					<Route path="/profile" element={<Profile />} />
					<Route
						path="/profile/:profileUserId"
						element={
							<ProfileProvider>
								<Profile />
							</ProfileProvider>
						}
					/>
					<Route
						path="/profile/:profileUserId/:content"
						element={
							<ProfileProvider>
								<Profile />
							</ProfileProvider>
						}
					/>

					{/* Posts */}
					<Route
						path="/post/create"
						element={
							<ProtectedRoute>
								<CreatePost />
							</ProtectedRoute>
						}
					/>
					<Route path="/post/:postId" element={<PostDetails />} />

					{/* Galleries */}
					<Route
						path="/gallery/create"
						element={
							<ProtectedRoute>
								<CreateGallery />
							</ProtectedRoute>
						}
					/>

					{/* 404 Endpoint */}
					<Route path="*" element={<NotFound />} />

					<Route path="/test" element={<Test />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
