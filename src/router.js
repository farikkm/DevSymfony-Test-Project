const routes = {
  "/": () => import("./pages/home.js"),
  "/result": () => import("./pages/result.js"),
};

const rootElement = document.getElementById("app");

export async function navigateTo(path) {
  window.history.pushState({}, path, window.location.origin + path);
  await router();
}

export async function router() {
  const path = window.location.pathname;
  const route = routes[path] || routes["/"];

  try {
    const viewModule = await route();
    rootElement.innerHTML = "";
    rootElement.appendChild(await viewModule.default());
  } catch (e) {
    console.error("Routing error:", e);
  }
}

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", router);
