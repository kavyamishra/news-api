import './App.css';
import axios from 'axios';
import { useState, useRef } from 'react';

function App() {
  const [param, setParam] = useState('');
  const [articles, setArticles] = useState([]);
  const inputRef = useRef("")

  const addPara = (e) => {
    setParam(e.target.value);
  };

  const displayNews = async (e) => {
    e.preventDefault();
    try {
      const url = `https://newsapi.org/v2/everything?q=${param}&from=2023-05-30&sortBy=publishedAt&apiKey=5f066ad419b84c308574b8b5f709f040`;
      console.log(url, param);
      const response = await axios.get(url);
      setArticles(response.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="App">
        <form onSubmit={displayNews}>
          <input type="text" name="q" id="q" onChange={addPara} ref={inputRef}/>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="articles">
        {articles.map((article, index) => (
          <div key={index} className='flexAlign'>
            <div>
            <h2 className='heading'>{article.author}</h2>
            <p className='desc'>{article.description}</p>
            </div>
            <img src={article.urlToImage} alt="" className='img'/>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
