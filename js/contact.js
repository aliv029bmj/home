// İletişim formu için JavaScript
function handleSubmit(event) {
  event.preventDefault()
  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const message = document.getElementById("message").value.trim()

  // Basit form doğrulama
  if (!name || name.length === 0) {
    alert("Please enter a valid name!")
    return
  }
  if (!email) {
    alert("Please enter a valid email!")
    return
  }
  if (!message) {
    alert("Please enter a message!")
    return
  }

  // Gönder butonunu devre dışı bırak ve yükleniyor göster
  const submitButton = document.querySelector('.contact-form button[type="submit"]')
  const originalButtonText = submitButton.textContent
  submitButton.disabled = true
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

  // Form verilerini hazırla
  const contactData = { name, email, message }

  // API isteği gönder - orijinal fetch kullanımını koru
  fetch("https://learning-journey-new-backend.onrender.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text)
        })
      }
      return response.json()
    })
    .then(() => {
      // Başarılı mesaj göster
      showNotification("Message sent successfully!", "success")
      // Formu sıfırla
      document.querySelector(".contact-form").reset()
    })
    .catch((error) => {
      console.error("Error:", error)
      // Hata mesajı göster
      showNotification(error.message || "An error occurred while sending the message.", "error")
    })
    .finally(() => {
      // Gönder butonunu tekrar etkinleştir
      submitButton.disabled = false
      submitButton.textContent = originalButtonText
    })
}

// Bildirim gösterme fonksiyonu
function showNotification(message, type) {
  // Önce eski bildirimleri temizle
  const oldNotifications = document.querySelectorAll(".notification")
  oldNotifications.forEach((notification) => {
    document.body.removeChild(notification)
  })

  // Yeni bildirim oluştur
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `

  document.body.appendChild(notification)

  // Bildirimi göster
  setTimeout(() => {
    notification.classList.add("show")
  }, 10)

  // Otomatik kapanma
  const timeout = setTimeout(() => {
    closeNotification(notification)
  }, 5000)

  // Kapatma butonu
  const closeButton = notification.querySelector(".notification-close")
  closeButton.addEventListener("click", () => {
    clearTimeout(timeout)
    closeNotification(notification)
  })
}

function closeNotification(notification) {
  notification.classList.remove("show")
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 300)
}

// Form ve bildirim için CSS ekle
document.addEventListener("DOMContentLoaded", () => {
  // Bildirim için CSS ekle
  const notificationStyles = document.createElement("style")
  notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        z-index: 1000;
        max-width: 350px;
        background-color: var(--card-bg);
        border: 1px solid var(--card-border);
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        border-left: 4px solid #4caf50;
    }

    .notification.error {
        border-left: 4px solid #f44336;
    }

    .notification-content {
        display: flex;
        align-items: center;
    }

    .notification-content i {
        margin-right: 10px;
        font-size: 1.2em;
    }
    
    .notification.success i {
        color: #4caf50;
    }
    
    .notification.error i {
        color: #f44336;
    }

    .notification-close {
        background: none;
        border: none;
        color: var(--text-color);
        font-size: 1.2em;
        cursor: pointer;
        margin-left: 10px;
    }
    `
  document.head.appendChild(notificationStyles)
})

