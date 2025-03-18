fetch("https://learning-journey-new-backend.onrender.com/api/projects")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText)
    }
    return response.json()
  })
  .then((data) => {
    const projectList = document.getElementById("project-list")
    projectList.innerHTML = ""
    if (data.length === 0) {
      projectList.innerHTML = "<p>No projects available.</p>"
    } else {
      data.forEach((project, index) => {
        let iconClass = "fa-folder"
        if (project.title.includes("CarApp") || project.title.includes("Rent Car")) iconClass = "fa-car"
        else if (project.title.includes("CODM DATA") || project.title.includes("TASK DATA")) iconClass = "fa-database"
        else if (project.title.includes("TGBOT")) iconClass = "fa-robot"
        else if (project.title.includes("DB TASK") || project.title.includes("TASK")) iconClass = "fa-tasks"
        else if (project.title.includes("IRSAD DB DESIGN") || project.title.includes("DESIGN"))
          iconClass = "fa-draw-polygon"
        else if (project.title.includes("Survivor")) iconClass = "fa-user-shield"
        else if (project.title.includes("Chat")) iconClass = "fa-comments"
        else if (project.title.includes("Smart Farm")) iconClass = "fa-tractor"
        else if (project.title.includes("red-bank")) iconClass = "fa-university"

        const item = document.createElement("div")
        item.className = "project-item"
        item.style.animationDelay = `${index * 0.1}s`
        item.innerHTML = `
                    <i class="fas ${iconClass} icon"></i>
                    <h3>${project.title}</h3>
                    <p>${project.description || "No description available"}</p>
                    <a href="${project.link || "#"}" target="_blank">View Project</a>
                `
        projectList.appendChild(item)
      })
    }
  })
  .catch((error) => {
    console.error("Error fetching projects:", error)
    document.getElementById("project-list").innerHTML = "<p>Couldn’t load projects, backend might be down.</p>"
  })

