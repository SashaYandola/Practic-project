import axios from 'axios';
import useSWR from 'swr';

const API_URL = 'https://api.github.com/orgs/facebook/repos';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ReposList = () => {
  const { data, error, isLoading } = useSWR(API_URL, fetcher);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div>
      {data.map((repo) => (
        <div key={repo.id} className="mb-4">
          <p className="text-lg font-semibold">ID: {repo.id}</p>
          <p className="text-lg">Name: {repo.name}</p>
          <p className="text-lg">Language: {repo.language}</p>
          <p className="text-lg">Stars: {repo.stargazers_count}</p>
          <hr className="my-2" />
        </div>
      ))}
    </div>
  );
};

export default ReposList;
