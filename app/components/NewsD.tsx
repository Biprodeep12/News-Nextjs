// import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/NewsD.module.css';

export default function NewsD({ articles, loading }) {
  return (
    <div className={styles.NewsDCont}>
      <div id={styles.NewsDContDisplay}>
        {loading ? (
          <div className={styles.loadingSpinner}></div>
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className={styles.article}>
              {article.urlToImage ? (
                <Image
                  src={article.urlToImage}
                  alt={article.title || 'News Image'}
                  className={styles.articleImage}
                />
              ) : (
                <div className={styles.placeholderImage}>No Image</div>
              )}
              <h2>{article.title || 'No Title Available'}</h2>
              <p>
                <strong>Author:</strong> {article.author || 'Unknown'}
              </p>
              <a href={article.url} target='_blank' rel='noopener noreferrer'>
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className={styles.NoArt}>Try Searching Articles</p>
        )}
      </div>
    </div>
  );
}
