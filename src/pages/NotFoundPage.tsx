import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h1>No movie found</h1>
      <Link to={'/home'} className="cursor-pointer underline text-primary">
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}

export default NotFoundPage;
