document.querySelectorAll(".accordion").forEach(button => {
  button.addEventListener("click", async () => {
    const panel = button.nextElementSibling;

    if (!panel.innerHTML) { 
      let file = button.getAttribute("data-file");
      try {
        let response = await fetch(file);
        let content = await response.text();
        panel.innerHTML = content;
      } catch (err) {
        panel.innerHTML = "<p>Sorry, this post could not be loaded.</p>";
      }
    }

    button.classList.toggle("active");
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});