import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES_PATHS } from "./routes";
import { Home, MediaStep, NameStep, PassionsStep } from "@/pages";

export const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/onboarding"
        element={<Navigate to={ROUTES_PATHS.onboardingName} replace />}
      />

      <Route path={ROUTES_PATHS.onboardingName} element={<NameStep />} />
      <Route
        path={ROUTES_PATHS.onboardingPassions}
        element={<PassionsStep />}
      />
      <Route path={ROUTES_PATHS.onboardingMedia} element={<MediaStep />} />

      <Route
        path={ROUTES_PATHS.home}
        element={<Navigate to={ROUTES_PATHS.onboardingName} />}
      />

      <Route path={ROUTES_PATHS.preview} element={<Home />} />

      <Route
        path={ROUTES_PATHS.notFound}
        element={<Navigate to={ROUTES_PATHS.home} replace />}
      />
    </Routes>
  </BrowserRouter>
);
