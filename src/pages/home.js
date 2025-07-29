export default function createHomeView() {
  const el = document.createElement('div');
  el.innerHTML = `
    <h1>Home</h1>
    <p>Welcome to the home page!</p>

    <a href="/result">Result</a>
  `;
  return el;
}