document.querySelector(".select-header").addEventListener("click", () => {
  const options = document.querySelector(".select-options")
  options.classList.toggle("show")
})

document.querySelectorAll(".select-options li").forEach((option) => {
  option.addEventListener("click", () => {
    const selectedValue = option.getAttribute("data-value")
    document.querySelector(".select-header").textContent = option.textContent
    document.querySelector(".select-options").classList.remove("show")
    document.getElementById("category-filter").value = selectedValue
    filterResources()
  })
})

document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-select")) {
    document.querySelector(".select-options").classList.remove("show")
  }
})

function renderResources(data) {
  const backendList = document.getElementById("backend-resources")
  const frontendList = document.getElementById("frontend-resources")
  const selectedCategory = document.getElementById("category-filter").value

  backendList.innerHTML = ""
  frontendList.innerHTML = ""

  const backendResources = data.filter(
    (resource) =>
      (resource.category && resource.category.startsWith("Backend -")) ||
      (resource.additionalCategory && resource.additionalCategory === "Backend"),
  )
  const frontendResources = data.filter(
    (resource) =>
      (resource.category && resource.category.startsWith("Frontend -")) ||
      (resource.additionalCategory && resource.additionalCategory === "Frontend"),
  )

  const filteredBackendResources =
    selectedCategory === "all"
      ? backendResources
      : selectedCategory === "Backend"
        ? backendResources.filter((resource) => resource.additionalCategory === "Backend")
        : backendResources.filter((resource) => resource.category === selectedCategory)
  filteredBackendResources.forEach((resource, index) => {
    const item = document.createElement("div")
    item.className = "resource-item"
    item.style.animationDelay = `${index * 0.1}s`
    item.innerHTML = `
            <h3>${resource.title || "No Title"}</h3>
            <a href="${resource.url || "#"}" target="_blank">Link</a>
            <p>Category: ${resource.category || "No Category"}</p>
            <p>Additional: ${resource.additionalCategory || "None"}</p>
            <p class="description">${resource.description || "No description available."}</p>
        `
    backendList.appendChild(item)
  })

  const filteredFrontendResources =
    selectedCategory === "all"
      ? frontendResources
      : selectedCategory === "Frontend"
        ? frontendResources.filter((resource) => resource.additionalCategory === "Frontend")
        : frontendResources.filter((resource) => resource.category === selectedCategory)
  filteredFrontendResources.forEach((resource, index) => {
    const item = document.createElement("div")
    item.className = "resource-item"
    item.style.animationDelay = `${index * 0.1}s`
    item.innerHTML = `
            <h3>${resource.title || "No Title"}</h3>
            <a href="${resource.url || "#"}" target="_blank">Link</a>
            <p>Category: ${resource.category || "No Category"}</p>
            <p>Additional: ${resource.additionalCategory || "None"}</p>
            <p class="description">${resource.description || "No description available."}</p>
        `
    frontendList.appendChild(item)
  })

  if (filteredBackendResources.length === 0) {
    backendList.innerHTML = "<p>No Java Backend resources match this category.</p>"
  }
  if (filteredFrontendResources.length === 0) {
    frontendList.innerHTML = "<p>No Frontend resources match this category.</p>"
  }
}

function filterResources() {
  fetch("https://learning-journey-new-backend.onrender.com/api/resources")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      renderResources(data)
    })
    .catch((error) => {
      console.error("Error fetching resources:", error)
      document.getElementById("backend-resources").innerHTML = "<p>Couldn’t load resources, backend might be down.</p>"
      document.getElementById("frontend-resources").innerHTML = "<p>Couldn’t load resources, backend might be down.</p>"
    })
}

filterResources()

