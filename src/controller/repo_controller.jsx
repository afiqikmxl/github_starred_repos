import { useState, useEffect } from "react";

const useRepoController = () => {
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRepos = async (pageNumber = 1) => {
        setLoading(true);
        setError(null);

        try {
            const tenDaysAgo = new Date();
            tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
            const formattedDate = tenDaysAgo.toISOString().split("T")[0];

            const response = await fetch(
                `https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&page=${pageNumber}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setRepos((prevRepos) => [...prevRepos, ...data.items]); 
            setPage(pageNumber);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    return { repos, fetchRepos, loading, error, page };
};

export default useRepoController;
