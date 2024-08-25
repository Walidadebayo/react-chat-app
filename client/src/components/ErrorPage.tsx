import { FaAngleUp, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "./Button";

interface ErrorPageProps {
  type?: string;
  title?: string;
  message?: string;
}

function ErrorPage({ type, title, message }: ErrorPageProps) {
  return (
    <section className="bg-white flex justify-center align-middle">
      <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <div className="flex justify-center">
            <FaExclamationTriangle className="mb-4 text-8xl text-danger" />
          </div>
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">
            {type?.toUpperCase() || 404}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {title || "Oops! We can't seem to find that page."}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {message ||
              "The page you're looking for might have been removed, or the URL might be incorrect. Please check the URL and try again."}
          </p>
          {type === "404" ? (
            <Link
              to="/"
              className="inline-flex text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
            >
              Back to Home
              <FaAngleUp className="ic-md" />
            </Link>
          ) : (
            <Button
              onClick={() => window.location.reload()}
              className="inline-flex text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
            >
              Go Back
              <FaAngleUp className="ic-md inline-flex" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
