
window.addEventListener("DOMContentLoaded", async (event) => {
  const res = await fetch("/kitten/image"); // result is currently a promise.
  const json = await res.json();
  debugger;
  if (res.ok) {
    document.querySelector(`.cat-pic`).setAttribute("src", json.src)
  };
})
