import React, { useEffect, useState } from 'react';
import styles from '../styles/Nav.module.css';

export default function Nav({
  setArticles,
  setLoading,
  setSelectedSort,
  selectedSort,
}) {
  const [searchValue, setSearchValue] = useState('');
  const fetchCustomNews = async (query) => {
    if (!query) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching custom news:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      fetchCustomNews(searchValue.trim());
    }
  };

  const toggleStyle = (sortType) => {
    setSelectedSort(sortType);
    fetchCustomNews(searchValue.trim());
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>News-Chor</div>
        <input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder='Search for news...'
          className={styles.searchInput}
        />
      </nav>
      <div className={styles.toggleheadlines}>
        <button
          className={`${styles.relevance} ${
            selectedSort === 'relevance' ? styles.active : ''
          }`}
          onClick={() => toggleStyle('relevance')}>
          Relevance
        </button>
        <button
          className={`${styles.tophead} ${
            selectedSort === 'popularity' ? styles.active : ''
          }`}
          onClick={() => toggleStyle('popularity')}>
          Popularity
        </button>
      </div>
    </>
  );
}
