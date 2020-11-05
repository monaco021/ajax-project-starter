
window.addEventListener("DOMContentLoaded", async (event) => {

  const res = await fetch("/kitten/image"); // result is currently a promise.
  const json = await res.json();
  //debugger;
  if (res.ok) {
    document.querySelector(`.cat-pic`).setAttribute("src", json.src)
  } else {

    throw alert("Something went wrong! Please try again!");

  }
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

document.getElementById("upvote").addEventListener("click", event => {
  fetch("/kitten/upvote", { method: "PATCH" })
    .then(res => {
      return res.json();
    })
    .then(res => {
      document.querySelector(".score").innerHTML = res.score;
    })
})

document.getElementById("downvote").addEventListener("click", event => {
  fetch("/kitten/downvote", { method: "PATCH" })
  .then(res => {
    return res.json();
  })
  .then(res => {
    document.querySelector(".score").innerHTML = res.score;
  })
})
