export default function createHomeView() {
  const el = document.createElement('div');
  el.innerHTML = `
    <h1>Result</h1>
    <p>It's a result page!</p>
  `;
  return el;
}