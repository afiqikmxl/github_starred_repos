import React, { useState, useEffect } from "react";
import "../styles/App.css";
import useRepoController from "../controller/repo_controller";

const App = () => {
  const { repos, fetchRepos, loading, error, page } = useRepoController();

  return (
    <div className="container">
      <h1>Trending Repos</h1>
      <div className="repo-list">
        {repos?.length > 0 ? (
          repos.map((repo, index) => (
            <div key={`${repo.id}-${index}`} className="repo-card">
              <img src={repo.owner.avatar_url} alt={repo.owner.login} className="repo-avatar" />
              <h2 className="repo-title">{repo.name}</h2>
              <p className="repo-description">{repo.description}</p>
              <p>⭐ {repo.stargazers_count}</p>
            </div>
          ))) : (
          <p>Loading...</p>
        )}
      </div>


      <button onClick={fetchRepos} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default App;
