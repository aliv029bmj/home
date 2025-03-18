function expandMember(iconElement) {
  const member = iconElement.parentElement
  member.classList.toggle("expanded")
}

window.addEventListener("load", () => {
  const members = document.querySelectorAll(".member")
  members.forEach((member, index) => {
    member.style.animation = `slideInUp 1s ease-out ${index * 0.0}s backwards`
  })
})

fetch("https://learning-journey-new-backend.onrender.com/api/logs")
  .then((response) => response.json())
  .then((data) => {
    const latestLog = data[data.length - 1]
    const latestLogDiv = document.getElementById("latest-log")
    latestLogDiv.innerHTML = `
            <h3>${latestLog.title}</h3>
            <p>${latestLog.description} <br><small>${latestLog.date}</small></p>
        `
  })
  .catch((error) => {
    console.error("Error:", error)
    document.getElementById("latest-log").innerHTML = "<p>Couldn’t load logs, backend might be down.</p>"
  })

