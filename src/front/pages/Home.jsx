import React, { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const { store, actions } = useGlobalReducer();

	useEffect(() => {
		if (store.token) {
			actions.getProtectedMessage(store.token);
		}
		// No need to set message when logged out; handled in render
	}, [store.token]);

	const isLoggedIn = !!store.token;

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Ayuden porque no encuentro el error del mensaje privado!</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
				{isLoggedIn ? (
					store.message ? (
						<span>{store.message}</span>
					) : store.error ? (
						<span className="text-danger">{store.error}</span>
					) : (
						<span>Loading protected message...</span>
					)
				) : (
					<span>🔒 Please log in to view this protected message.</span>
				)}
			</div>
		</div>
	);
};
