import styles from '../styles/Nav.module.css';

import React, { useState } from 'react';

export default function Nav({ setArticles, setLoading }) {
  const apiKey = 'b9e0fd3b510f4cd4804129c42da28a37';
  const apiURl = 'https://newsapi.org/v2/everything?q=';
  const [searchValue, setSearchValue] = useState('');

  const checkNews = async (title) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURl}${title}&apiKey=${apiKey}`);
      const data = await response.json();
      console.log(data);
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      checkNews(searchValue);
    }
  };

  return (
    <nav className={styles.navabar}>
      <div className={styles.navLogo}>News-Chor</div>
      <input
        type='text'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder='Search..'
      />
    </nav>
  );
}
