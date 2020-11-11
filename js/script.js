const API_URL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    let currentAuthor = document.getElementById("author");
    let currentQuote = document.getElementById("quote");

    /* Gets random quote, and adds fade in animation to both author and quote text*/

    function getRandomQuote(array) {
      let minimum = 0;
      let maximum = array.length;
      let randomNumber =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      currentQuote.textContent = data.quotes[randomNumber].quote;
      currentAuthor.textContent = data.quotes[randomNumber].author;

      currentAuthor.animate([{ opacity: 0.7 }, { opacity: 1 }], {
        duration: 600,
      });
      currentQuote.animate([{ opacity: 0.7 }, { opacity: 1 }], {
        duration: 600,
      });
    }

    let colors = [
      "#16a085",
      "#27ae60",
      "#86a7c1",
      "#b79dbb",
      "#c48169",  
      "#cdfc52",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ];
    
    /* Sets random color from color array and adds animation for fade in of the background - color */

    function setRandomColorForEachQuote(array) {
      let minimum = 0;
      let maximum = array.length;
      let randomNumber =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

      // Seting that random color for different elements
      document.body.style.backgroundColor = array[randomNumber];
      currentAuthor.style.color = array[randomNumber];
      currentQuote.style.color = array[randomNumber];
      document.getElementById('tweet-quote-button').style.color = array[randomNumber];
      document.getElementById('tumblr-quote-button').style.color = array[randomNumber];
      document.body.classList.add("random-color-transition-animation");
    }

    /* Posting Quote and Author to Tweet / Tumblr */ 

    const tweetButton = document.getElementById('tweet-quote-button');
    const tumblrButton = document.getElementById('tumblr-quote-button');

    tweetButton.setAttribute(
      'href',
      'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    tumblrButton.setAttribute(
      'href',
      'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(currentAuthor) +
        '&content=' +
        encodeURIComponent(currentQuote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    );    

    /* Click on text box to get new quote */

    const textBox = document.getElementById('text-select')
    textBox.addEventListener("click", () => {
      getRandomQuote(data.quotes);
      setRandomColorForEachQuote(colors);
    });

    getRandomQuote(data.quotes);
  })
  .catch((error) => console.error(error));