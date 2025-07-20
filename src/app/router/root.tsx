import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES_PATHS } from "./routes";

export const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Редирект /onboarding на первый шаг */}
      <Route
        path="/onboarding"
        element={<Navigate to={ROUTES_PATHS.onboardingName} replace />}
      />

      {/* Шаги онбординга */}
      <Route path={ROUTES_PATHS.onboardingName} element={<></>} />
      <Route path={ROUTES_PATHS.onboardingPassions} element={<></>} />
      <Route path={ROUTES_PATHS.onboardingMedia} element={<></>} />
      <Route path={ROUTES_PATHS.onboardingPreview} element={<></>} />

      {/* Главный экран со свайпом */}
      <Route path={ROUTES_PATHS.home} element={<></>} />

      {/* Любые другие пути → / */}
      <Route
        path={ROUTES_PATHS.notFound}
        element={<Navigate to={ROUTES_PATHS.home} replace />}
      />
    </Routes>
  </BrowserRouter>
);
