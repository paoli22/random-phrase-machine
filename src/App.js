import React, { useState, useEffect } from "react";
import "./App.css"; // Importamos los estilos

function App() {
  const [phrases, setPhrases] = useState([]);
  const [indice, setIndice] = useState(0);
  const [color, setColor] = useState("#ffffff"); // Estado para el color de fondo

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then((data) => setPhrases(data.quotes))
      .catch((error) => console.error("Error al obtener frases:", error));
  }, []);

  // Función para generar colores aleatorios
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const nextPhrase = () => {
    setIndice((prevIndice) => (prevIndice + 1) % phrases.length);
    setColor(getRandomColor()); // Cambia el color al presionar el botón
  };

  return (
    <div className="App" style={{ backgroundColor: color }}>
      {phrases.length > 0 ? (
        <div id="quote-box" className="quote-container">
          <p id="text" className="quote-text" style={{color: color}}>"{phrases[indice].quote}"</p>
          <p id="author" className="quote-author" style={{color: color}}>- {phrases[indice].author}</p>

          {/* Redes sociales */}
          <div className="social-buttons">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                phrases[indice]?.quote + " - " + phrases[indice]?.author
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fa fa-twitter"
            ></a>

            <a
              id="tumblr-quote"
              href="https://www.tumblr.com/widgets/share/tool"
              target="_blank"
              rel="noopener noreferrer"
              className="fa fa-tumblr"
            ></a>
          </div>

          {/* Botón que cambia de color */}
          <button id="new-quote" className="new-quote-btn" onClick={nextPhrase}>
            New Quote
          </button>
        </div>
      ) : (
        <p>Cargando frases...</p>
      )}
    </div>
  );
}

export default App;
