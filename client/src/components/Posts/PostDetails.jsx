import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { host } from "../../common/appConstants.js";
import { dateToString } from "../../utils/dateUtils.js";
import { Link } from "react-router";
export default function PostDetails() {
	const { postId } = useParams();
	const [post, setPost] = useState({});

	useEffect(() => {
		if (!postId) return;

		fetchPostData();
	}, [postId]);

	async function fetchPostData() {
		try {
			const response = await fetch(
				`${host}/post/get-post?postId=${postId}`,
				{
					method: "GET",
					credentials: "include",
				}
			);

			const data = await response.json();

			setPost(data);
		} catch (err) {
			console.log(err);
		}
	}

	if (!post.user) {
		return <span>Loading...</span>;
	}

	return (
		<div className="m-3 p-3 d-flex">
			{/* Post Details (Left Side) */}
			<div className="post-card flex-grow-1">
				<div
					className="card mb-3 p-3 shadow-sm"
					style={{ minHeight: "calc(100vh - 40px)" }}
				>
					{/* Card Header */}
					<div className="d-flex align-items-center border-bottom pb-2">
						<img
							src={post.user.image}
							className="rounded-circle me-2"
							alt="Profile"
							width="40"
							height="40"
						/>
						<div>
							<h6 className="mb-0">{post.user.username}</h6>
							<p className="text-muted small mb-0">
								{dateToString(post.date)}
							</p>
						</div>
					</div>

					{/* Card Body (Content) */}
					<div className="mt-2">
						<p>{post.content}</p>
						{post.images.length > 0 && (
							<div className="d-flex flex-wrap">
								{post.images.map((image, index) => (
									<img
										key={index}
										src={image}
										className="img-fluid rounded me-2 mb-2"
										alt="Post"
										style={{ maxWidth: "100px" }}
									/>
								))}
							</div>
						)}
					</div>

					{/* Card Footer (Interactions) */}
					<div className="d-flex justify-content-between mt-3 border-top pt-2">
						<Link
							to={`/post/${post._id}`}
							className="btn btn-outline-primary btn-sm"
						>
							View Details
						</Link>
						<button className="btn btn-outline-primary btn-sm">
							Like
						</button>
						<button className="btn btn-outline-secondary btn-sm">
							Comment
						</button>
						<button className="btn btn-outline-success btn-sm">
							Share
						</button>
					</div>
				</div>
			</div>

			{/* Comment Section (Right Side) */}
			<div
				className="comment-section ms-3"
				style={{
					flexBasis: "300px",
					maxWidth: "300px",
					height: "calc(100vh - 40px)",
					overflowY: "auto",
				}}
			>
				<h6>Comments</h6>
				{/* Add Comment Box */}
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Add a comment..."
					/>
					<button className="btn btn-outline-primary">Post</button>
				</div>

				{/* Example Comments */}
				<div className="comment">
					<p>
						<strong>User1:</strong> This is an awesome post!
					</p>
				</div>
				<div className="comment">
					<p>
						<strong>User2:</strong> I agree with this!
					</p>
				</div>
				{/* Add more comment sections as needed */}
			</div>
		</div>
	);
}
