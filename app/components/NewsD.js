// import { useEffect, useState } from 'react';
import styles from '../styles/NewsD.module.css';

export default function NewsD({ articles, loading }) {
  return (
    <div className={styles.NewsDCont}>
      <div id={styles.NewsDContDisplay}>
        {loading ? (
          <div className={styles.loadingSpinner}>
            <div className={styles.dot1}></div>
            <div className={styles.dot2}></div>
            <div className={styles.dot3}></div>
            <div className={styles.dot4}></div>
            <div className={styles.dot5}></div>
          </div>
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className={styles.article}>
              {article.urlToImage ? (
                <img
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
