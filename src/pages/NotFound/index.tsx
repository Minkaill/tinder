import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => (
  <div>
    <h1>404 — страница не найдена</h1>
    <Link to="/">Вернуться на главную</Link>
  </div>
);

export default NotFoundPage;
