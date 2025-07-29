export default function createResultView() {
  const container = document.createElement('div');
  container.className = 'result-container';

  const fact = localStorage.getItem('number_fact') || 'No fact found.';

  container.innerHTML = `
    <h1>Your Number Fact</h1>
    <p class="fact-text">${fact}</p>
    <button id="back-btn">Back to Home</button>
  `;

  const backBtn = container.querySelector('#back-btn');
  backBtn.addEventListener('click', () => {
    localStorage.removeItem('number_fact');
    history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  return container;
}
