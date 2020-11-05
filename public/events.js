
window.addEventListener("DOMContentLoaded", async (event) => {
  const res = await fetch("/kitten/image"); // result is currently a promise.
  const json = await res.json();
  //debugger;
  if (res.ok) {
    document.querySelector(`.cat-pic`).setAttribute("src", json.src)
  };

})

document.querySelector("#new-pic").addEventListener("click", (event) =>{
  event.preventDefault();
  fetch("/kitten/image") // result is currently a promise.
    .then (unresolvedFetch => {
      document.querySelector(".loader").innerHTML = "Loading..."
      //  debugger;
      return unresolvedFetch;
    })
    .then (unresolvedFetch => {
      return unresolvedFetch.json();
    })
    .then (resolvedFetch => {
        document.querySelector(`.cat-pic`).setAttribute("src", resolvedFetch.src);
        document.querySelector(".loader").innerHTML = ""
    })
})
