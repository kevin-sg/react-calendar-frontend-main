import React, { useEffect } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { checkingFinish, startChecking } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
	const dispatch = useDispatch();
	const { checking } = useSelector((state) => state.auth);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) return dispatch(startChecking());
		dispatch(checkingFinish());
		// eslint-disable-next-line
	}, [dispatch]);

	if (checking) {
		return <h5>Espere...</h5>;
	}

	return (
		<BrowserRouter>
			<div>
				<Routes>
					<Route
						path="/login"
						element={
							<PublicRoute>
								<LoginScreen />
							</PublicRoute>
						}
					/>

					<Route
						path="/"
						element={
							<PrivateRoute>
								<CalendarScreen />
							</PrivateRoute>
						}
					/>

					<Route path="*" component={<Navigate to="/" />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};
