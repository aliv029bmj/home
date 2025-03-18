fetch("https://learning-journey-new-backend.onrender.com/api/logs")
  .then((response) => {
    console.log("Response:", response)
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText)
    }
    return response.json()
  })
  .then((data) => {
    console.log("Data:", data)
    const logList = document.getElementById("log-list")
    logList.innerHTML = ""
    if (data.length === 0) {
      logList.innerHTML = "<p>No logs available.</p>"
    } else {
      data.forEach((log, index) => {
        const entry = document.createElement("div")
        entry.className = "log-entry"
        entry.style.animationDelay = `${index * 0.1}s`
        entry.innerHTML = `
                    <h3><i class="fas fa-code"></i>${log.title}</h3>
                    <p>${log.description}</p>
                    <div class="date">${log.date}</div>
                `
        logList.appendChild(entry)
      })
    }
  })
  .catch((error) => {
    console.error("Error fetching logs:", error)
    document.getElementById("log-list").innerHTML = "<p>Couldn’t load logs, backend might be down.</p>"
  })

