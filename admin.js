const form = document.getElementById("postForm");
const status = document.getElementById("status");

const BACKEND_URL = "https://sxlents-backend.onrender.com"; // Backend URL’in

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    key: document.getElementById("key").value,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    image: document.getElementById("image").value,
    link: document.getElementById("link").value
  };

  fetch(`${BACKEND_URL}/addPost`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resData => {
    if(resData.status === "ok") {
      status.textContent = "Post added successfully!";
      form.reset();
    } else {
      status.textContent = "Error: " + resData.message;
    }
  })
  .catch(err => {
    console.error(err);
    status.textContent = "Something went wrong!";
  });
});
