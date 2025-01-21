'use client';

import { useState } from 'react';
import Nav from './components/Nav';
import styles from './page.module.css';
import NewsD from './components/NewsD';

export default function Page() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState('relevance');

  return (
    <>
      <Nav
        setArticles={setArticles}
        setLoading={setLoading}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <div className={styles.mainContainer}>
        <NewsD articles={articles} loading={loading} />
        <div className={styles.foot}>
          <h1>News-Chor</h1>
          <h3>Made by the Black Community</h3>
        </div>
      </div>
    </>
  );
}
