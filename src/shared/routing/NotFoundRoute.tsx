export const NotFoundRoute: React.FC = () => {
  throw Object.assign(new Error("404 Not Found"), {
    status: 404
  });
};
