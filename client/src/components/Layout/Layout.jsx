import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Errors from "./Errors";

export default function Layout() {
	const location = useLocation();
	const hideFooterOn = ["/chat"];

	const firstPart = "/" + location.pathname.split("/")[1]; // Extracts the first part
	const showFooter = !hideFooterOn.includes(firstPart);

	return (
		<div className="wrapper">
			<Errors />
			<Header />
			<main className="content">
				<Outlet /> {/* This renders the current route */}
			</main>
			{showFooter && <Footer />}
		</div>
	);
}
