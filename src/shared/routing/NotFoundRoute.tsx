import { ErrorPage } from "@/pages/error";

export const NotFoundRoute: React.FC = () => (
    <ErrorPage
        error={Object.assign(new Error("404 Not Found"), {
        status: 404,
        name: "NotFoundError",
        })}
        resetErrorBoundary={() => window.location.reload()}
    />
);