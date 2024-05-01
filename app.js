const API_KEY = '9c96c8da16ad49e8896d7bc8a721b79b'
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

// Fetch news articles from API
async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Display news articles on the page
function renderNews(articles) {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = '';
  articles.forEach(article => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = article.url;
    a.textContent = article.title;
    li.appendChild(a);
    newsList.appendChild(li);
  });
}

// ***********************
// Register service worker
// ***********************

// Check for browser support of serviceworker
// Check if service worker is available
if ('serviceWorker' in navigator) {
  // Wait for the page to load.
  window.addEventListener('load', () => {
    // Register a service worker
    // Returns a promise that resolves to a service worker registration object
    // From here check service-worker.js
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Fetch news articles and render them
async function init() {
  const articles = await fetchNews();
  renderNews(articles);
}

init();
