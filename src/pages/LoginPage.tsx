import GenreButton from '../components/GenreButton';

function LoginPage() {
  return <div><GenreButton genre={"Adventure"}></GenreButton><GenreButton genreId={28} disabled={true}></GenreButton></div>;
}

export default LoginPage;
