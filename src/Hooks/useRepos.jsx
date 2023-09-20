import { useState, useEffect } from 'react';

function useGitHubRepos(accessToken) {
  const [repos, setRepos] = useState([]);
  const perPage = 100;
  const page = 1;
  useEffect(() => {
    // Ensure the access token is provided  
    if (!accessToken) {
      console.error('Access token is missing.');
      return;
    }

    fetch(`https://api.github.com/user/repos?page=${page}&per_page=${perPage}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        
        const repoNames = data.map((repo) => repo.name);
        setRepos(repoNames);
      })
      .catch((error) => {
        console.error('Error fetching data from GitHub API:', error);
      });
  }, []);

  return repos;
}

export default useGitHubRepos;
