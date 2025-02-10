document.addEventListener('DOMContentLoaded', () => {
  // --- Countdown to Valentine's Day ---
  const countdownElement = document.getElementById('countdown');
  function updateCountdown() {
      const today = new Date();
      const valentinesDay = new Date(today.getFullYear(), 1, 14);

      if (today > valentinesDay) {
          valentinesDay.setFullYear(valentinesDay.getFullYear() + 1);
      }

      const timeDiff = valentinesDay - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      countdownElement.textContent = `${daysLeft} days until Valentine's Day!`;
  }
  updateCountdown();

  // --- Quote Generator (Hardcoded Quotes) ---
  const quotes = [
      "You had me at hello. - *Jerry Maguire*",
      "I wish I knew how to quit you. - *Brokeback Mountain*",
      "Whatever our souls are made of, his and mine are the same. - *Wuthering Heights*",
      "To me, you are perfect. - *Love Actually*",
      "You are my sun, my moon, and all my stars. - *E.E. Cummings*",
      "I will love you until the stars go out, and the tides no longer turn.",
      "I love you not only for what you are, but for what I am when I am with you. - *Elizabeth Barrett Browning*",
      "You make me want to be a better man. - *As Good As It Gets*",
      "In all the world, there is no heart for me like yours. - *Maya Angelou*",
      "I have waited for this opportunity for more than half a century, to repeat to you once again my vow of eternal fidelity and everlasting love. - *Gabriel Garcia Marquez*",
      "Every love story is beautiful, but ours is my favorite."
  ];

  const quoteButton = document.getElementById('quoteButton');
  const quoteDisplay = document.getElementById('quoteDisplay');
  const loveJarZone = document.getElementById('loveJarZone');
  const viewJarButton = document.getElementById('viewJarButton');
  const jarDisplay = document.getElementById('jarDisplay');

  quoteButton.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteDisplay.textContent = quotes[randomIndex];
      quoteDisplay.setAttribute('draggable', 'true');
  });

  // --- Drag and Drop Logic ---
  quoteDisplay.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', quoteDisplay.textContent);
  });

  loveJarZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      loveJarZone.querySelector('img').classList.add('scale-125');
  });

  loveJarZone.addEventListener('dragleave', () => {
      loveJarZone.querySelector('img').classList.remove('scale-125');
  });

  loveJarZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const droppedQuote = e.dataTransfer.getData('text/plain');

    let savedQuotes = JSON.parse(localStorage.getItem('loveJar')) || [];
    savedQuotes.push(droppedQuote);
    localStorage.setItem('loveJar', JSON.stringify(savedQuotes));

    loveJarZone.querySelector('img').classList.remove('scale-125');
    loveJarZone.querySelector('img').classList.add('animate-bounce');  // Bounce effect on drop
    setTimeout(() => {
        loveJarZone.querySelector('img').classList.remove('animate-bounce');
    }, 1000);
  });

  // --- View Love Jar ---
  viewJarButton.addEventListener('click', () => {
      jarDisplay.innerHTML = "";
      const savedQuotes = JSON.parse(localStorage.getItem('loveJar')) || [];

      if (savedQuotes.length === 0) {
          jarDisplay.innerHTML = "<p class='text-gray-500'>Your Love Jar is empty! Start adding some quotes. 💕</p>";
      } else {
          savedQuotes.forEach((quote, index) => {
              const quoteContainer = document.createElement('div');
              quoteContainer.className = "flex justify-between items-center p-2 bg-pink-100 rounded-lg shadow-sm mb-2";

              const quoteElement = document.createElement('p');
              quoteElement.className = "text-left";
              quoteElement.textContent = `${index + 1}. ${quote}`;

              const deleteButton = document.createElement('button');
              deleteButton.textContent = "🗑️";
              deleteButton.className = "ml-4 text-red-500 hover:text-red-700";
              deleteButton.addEventListener('click', () => {
                  savedQuotes.splice(index, 1);
                  localStorage.setItem('loveJar', JSON.stringify(savedQuotes));
                  viewJarButton.click();
              });

              quoteContainer.appendChild(quoteElement);
              quoteContainer.appendChild(deleteButton);
              jarDisplay.appendChild(quoteContainer);
          });
      }
  });
});
