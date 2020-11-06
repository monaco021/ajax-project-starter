
window.addEventListener("DOMContentLoaded", async (event) => {

  const res = await fetch("/kitten/image"); // result is currently a promise.
  const json = await res.json();
  //debugger;
  if (res.ok) {
    document.querySelector(`.cat-pic`).setAttribute("src", json.src)
  } else {
    document.querySelector(".error").innerHTML = json.message;
    // throw alert(json.message);

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

document.querySelector(".comment-form").addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(document.querySelector(".comment-form"));

  let comment = formData.get("user-comment") // this is a string
  fetch("/kitten/comments", { method: "POST", body: JSON.stringify({comment}), headers: {"Content-Type": "application/json"}})
  .then(res => {
    return res.json();
  })
  .then(res => {
    const commentArray = res.comments;
    console.log(commentArray)
    document.querySelector(".comments").innerHTML = ""
    commentArray.forEach((ele, i) => {
      console.log(ele)
      const newDiv = document.createElement("div");
      newDiv.innerHTML = ele;
      newDiv.setAttribute("id", i);
      console.log(newDiv);
      document.querySelector(".comments").appendChild(newDiv);
    })
  })
})
