import { navigateTo } from "../router.js";

export default function createHomeView() {
  const container = document.createElement("div");
  container.className = "number-fact-container";
  container.innerHTML = `
    <h1>Number Facts</h1>
    <p>Enter a number and choose the type of fact:</p>
    <input type="number" id="number-input" placeholder="Enter a number" />
    <br />
    <select id="fact-type">
      <option value="trivia">Trivia</option>
      <option value="math">Math</option>
      <option value="date">Date</option>
    </select>
    <br />
    <button id="get-fact-btn">Get Fact</button>
    <button id="random-fact-btn">Random Fact</button>
    <p id="fact-result"></p>
  `;

  const input = container.querySelector("#number-input");
  const select = container.querySelector("#fact-type");
  const button = container.querySelector("#get-fact-btn");
  const result = container.querySelector("#fact-result");
  const randomFactBtn = container.querySelector("#random-fact-btn");

  button.addEventListener("click", async () => {
    const number = input.value.trim();
    const type = select.value;

    if (!number) {
      result.textContent = "Please enter a number.";
      return;
    }

    let url = `http://numbersapi.com/${number}/${type}`;

    if (type === "date") {
      const [month, day] = number.split(".");

      if (!month || !day) {
        result.textContent = "Enter date as MM/DD (e.g., 2.14)";
        return;
      }
      url = `http://numbersapi.com/${month}/${day}/date`;
    }

    try {
      const response = await fetch(url);
      const text = await response.text();

      localStorage.setItem("number_fact", text);
      navigateTo("/result");
    } catch (error) {
      result.textContent = "Failed to fetch fact. Please try again.";
    }
  });

  randomFactBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("http://numbersapi.com/random");
      const text = await response.text();

      localStorage.setItem("number_fact", text);
      navigateTo("/result");
    } catch (error) {
      result.textContent = "Failed to fetch random fact.";
    }
  });

  return container;
}
