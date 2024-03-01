// News.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css'; // Import the updated CSS file

const News = () => {
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=95684166ba6f44d8a25fae04898fdbc8'
        );

        // Limit the headlines to the first 10 articles
        setHeadlines(response.data.articles.slice(0, 10));
      } catch (error) {
        console.error('Error fetching headlines:', error.message);
        setError('Failed to fetch headlines. Please try again later.');
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div>
      <h2>Latest Headlines</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {headlines.map((article, index) => (
            <li key={index}>
              <strong>{article.title}</strong>
              <p className="source">Source: {article.source.name}</p>
              <img
                src={article.urlToImage}
                alt={article.title}
                className="news-image"
                width="300"  // Set your desired width
                height="200" // Set your desired height
              />
              <p className="date">Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default News;
