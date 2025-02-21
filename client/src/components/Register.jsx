import React, { useState } from "react";
import { host } from "../common/appConstants.js";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// if (password !== confirmPassword) {
		//     alert("Passwords do not match!");
		//     return;
		// }

		try {
			const response = await fetch(`${host}/user/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					username,
					password,
					confirmPassword,
				}),
			});

			const data = await response.json();
            console.log(data);
            
			if (response.ok) {
				alert("Registration successful!");
				window.location.href = "/";
			} else {
				alert(data);
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Something went wrong. Please try again.");
		}
	};

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			<div className="card shadow p-4" style={{ width: "350px" }}>
				<h3 className="text-center">Register</h3>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="form-label">Username</label>
						<input
							type="text"
							className="form-control"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Email</label>
						<input
							type="email"
							className="form-control"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Password</label>
						<input
							type="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Re-enter Password</label>
						<input
							type="password"
							className="form-control"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary w-100">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
