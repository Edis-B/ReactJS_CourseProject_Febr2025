import { ProfileProvider, useProfile } from "../../contexts/ProfileContext.jsx";
import { useParams } from "react-router";
import { contentTypes } from "../../common/appConstants.js";

import ProfileHeader from "./ProfileHeader.jsx";
import UserPosts from "./UserPosts.jsx";
import Friends from "./Friends.jsx";

export default function Profile() {
	const { content } = useParams();

	function generateContent(type) {
		if (!type || type == contentTypes.POSTS) {
			return <UserPosts />;
		} else if (type == contentTypes.FRIENDS) {
			return <Friends />;
		} else if (type == contentTypes.FRIENDS) {
			return <Friends />;
		} else if (type == contentTypes.FRIENDS) {
			return <Friends />;
		}
	}
	return (
		<ProfileProvider>
			<div className="container mt-3">
				<ProfileHeader />

				{generateContent(content)}
			</div>
		</ProfileProvider>
	);
}
