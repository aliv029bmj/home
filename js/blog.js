// Blog sayfası için JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Blog gönderilerini getir
  fetchBlogPosts()

  function fetchBlogPosts() {
     // Skeleton loading göster
     const blogList = document.getElementById("blog-list")
     if (blogList) {
       blogList.innerHTML = `
                 <div class="skeleton-card"></div>
                 <div class="skeleton-card"></div>
                 <div class="skeleton-card"></div>
             `
     }

    fetch("https://learning-journey-new-backend.onrender.com/api/blog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        renderBlogPosts(data)
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error)
        if (blogList) {
          blogList.innerHTML = "<p>Couldn't load blog posts, backend might be down.</p>"
        }
      })
  }

  function renderBlogPosts(posts) {
    const blogList = document.getElementById("blog-list")
    if (!blogList) return

    blogList.innerHTML = ""

    if (!posts || posts.length === 0) {
      blogList.innerHTML = "<p>No blog posts available.</p>"
      return
    }

    posts.forEach((post, index) => {
      const item = document.createElement("div")
      item.className = "blog-post"
      item.style.animationDelay = `${index * 0.1}s`

      // XSS koruması için içeriği güvenli hale getir
      const safeTitle = escapeHTML(post.title)
      const safeContent = escapeHTML(post.content)
      const safeAuthor = escapeHTML(post.author)
      const safeDate = escapeHTML(post.date)

      item.innerHTML = `
                <h3>${safeTitle}</h3>
                <p>${safeContent.substring(0, 100)}...</p>
                <div class="meta">By ${safeAuthor} on ${safeDate}</div>
            `

      item.addEventListener("click", () => {
        showBlogPostModal(post)
      })

      blogList.appendChild(item)
    })
  }

  function showBlogPostModal(post) {
    // XSS koruması için içeriği güvenli hale getir
    const safeTitle = escapeHTML(post.title)
    const safeContent = escapeHTML(post.content)
    const safeAuthor = escapeHTML(post.author)
    const safeDate = escapeHTML(post.date)

    // Modal oluştur
    const modal = document.createElement("div")
    modal.className = "modal"
    modal.innerHTML = `
            <div class="modal-content">
                <button class="close-button">&times;</button>
                <h2>${safeTitle}</h2>
                <div class="modal-body">
                    <p>${safeContent}</p>
                </div>
                <div class="modal-footer">
                    <p>By ${safeAuthor} on ${safeDate}</p>
                </div>
            </div>
        `

    document.body.appendChild(modal)

    // Modal'ı göster
    setTimeout(() => {
      modal.classList.add("show")
    }, 10)

    // Kapatma butonu
    const closeButton = modal.querySelector(".close-button")
    closeButton.addEventListener("click", () => {
      modal.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(modal)
      }, 300)
    })

    // Dışarı tıklama ile kapatma
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show")
        setTimeout(() => {
          document.body.removeChild(modal)
        }, 300)
      }
    })

    // ESC tuşu ile kapatma
    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        modal.classList.remove("show")
        setTimeout(() => {
          document.body.removeChild(modal)
        }, 300)
        document.removeEventListener("keydown", escHandler)
      }
    })
  }

  // XSS koruması için HTML escape fonksiyonu
  function escapeHTML(str) {
    if (!str) return ""
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  // Modal için CSS ekle
  const modalStyle = document.createElement("style")
  modalStyle.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal.show {
        opacity: 1;
        visibility: visible;
    }

    .modal-content {
        background-color: var(--card-bg);
        border-radius: 15px;
        padding: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 4px 20px var(--shadow-color);
        transform: translateY(20px);
        transition: transform 0.3s ease;
    }

    .modal.show .modal-content {
        transform: translateY(0);
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--text-color);
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-footer {
        border-top: 1px solid var(--card-border);
        padding-top: 10px;
        font-style: italic;
        color: var(--secondary-text);
    }
    
    .skeleton-card {
        height: 150px;
        background: var(--card-bg);
        border-radius: 15px;
        margin-bottom: 30px;
        position: relative;
        overflow: hidden;
    }
    
    .skeleton-card::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0)
        );
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
    `
  document.head.appendChild(modalStyle)
})

