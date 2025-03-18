// Namespace oluşturma
const LearningJourney = {
  // API istekleri için yardımcı fonksiyon
  async fetchAPI(endpoint, options = {}) {
    const baseURL = "https://learning-journey-new-backend.onrender.com/api"
    const url = `${baseURL}/${endpoint}`

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  },

 

  // Hata mesajı gösterme
  showError: (container, message) => {
    const containerEl = document.getElementById(container)
    if (!containerEl) return

    const errorEl = document.createElement("div")
    errorEl.className = "error-message"
    errorEl.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        `

    containerEl.innerHTML = ""
    containerEl.appendChild(errorEl)
  },

  // Sayfa yüklendiğinde çalışacak genel başlatma fonksiyonu
  init: () => {
    // Sayfa yüklendiğinde animasyonları başlat
    document.addEventListener("DOMContentLoaded", () => {
      const animatedElements = document.querySelectorAll("[data-animation]")
      animatedElements.forEach((element) => {
        const animation = element.getAttribute("data-animation")
        element.style.animation = animation
      })
    })
  },
}

// Sayfa yüklendiğinde başlatma fonksiyonunu çağır
document.addEventListener("DOMContentLoaded", () => {
  LearningJourney.init()
})

// Tema değiştirme fonksiyonu
function toggleTheme() {
  const body = document.body
  const currentTheme = body.getAttribute("data-theme")
  const toggleButton = document.querySelector(".theme-toggle i")

  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "light")
    toggleButton.classList.remove("fa-moon")
    toggleButton.classList.add("fa-sun")
    localStorage.setItem("theme", "light")
  } else {
    body.setAttribute("data-theme", "dark")
    toggleButton.classList.remove("fa-sun")
    toggleButton.classList.add("fa-moon")
    localStorage.setItem("theme", "dark")
  }
}

// Sayfa yüklendiğinde tema ayarını kontrol et
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme)
    const toggleButton = document.querySelector(".theme-toggle i")
    if (savedTheme === "light") {
      toggleButton.classList.remove("fa-moon")
      toggleButton.classList.add("fa-sun")
    }
  }
})

