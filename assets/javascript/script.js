// Tanggal target untuk hitung mundur
const targetDate = new Date("November 20, 2024 00:00:00").getTime();

// Fungsi untuk membuka undangan
function openInvitation() {
  const websiteContent = document.querySelector(".website-content");
  const welcome = document.querySelector("#welcome-section");
  welcome.style.opacity = 0;
  welcome.style.transform = "translateY(-100vh)";
  setTimeout(() => {
    welcome.style.display = "none";
    websiteContent.style.display = "block";
  }, 500);
  document.querySelector('.audio-player').style.display = 'block';
  document.querySelector('#audio').play();
}

// Fungsi untuk mengontrol musik
function putarLagu() {
  const lagu = document.querySelector("#audio");
  const tombol = document.querySelector("#image-control");
  if (lagu.paused) {
    lagu.play();
    tombol.src = "assets/icon/played-music.svg";
    document.querySelector(".audio-player img").style.animationPlayState = "running";
  } else {
    lagu.pause();
    tombol.src = "assets/icon/paused-music.png";
    document.querySelector(".audio-player img").style.animationPlayState = "paused";
  }
}

// fungsi progress bar


window.onscroll = function() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
};

// Fungsi untuk memperbarui hitung mundur
function updateCountdown() {
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;

  const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((timeRemaining % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById("months").textContent = months.toString().padStart(2, "0");
  document.getElementById("days").textContent = days.toString().padStart(2, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

  if (timeRemaining < 0) {
    clearInterval(countdownInterval);
    ["months", "days", "hours", "seconds"].forEach(id => document.getElementById(id).textContent = "00");
  }
}

// Inisialisasi saat DOM sudah siap
document.addEventListener("DOMContentLoaded", function () {
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Inisialisasi slider profil
  const sliderContainer = document.getElementById("slider-container");
  window.swipe = function (direction) {
    const currentIndex = Math.round(sliderContainer.scrollLeft / sliderContainer.clientWidth);
    const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    sliderContainer.scrollTo({
      left: newIndex * sliderContainer.clientWidth,
      behavior: "smooth"
    });
  };
});

// Fungsi untuk menampilkan overlay gambar
// Fungsi untuk menampilkan overlay gambar
window.showOverlay = function (img) {
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");

  let imgContainer = document.createElement("div");
  imgContainer.style.position = "relative";
  imgContainer.style.display = "flex";
  imgContainer.style.flexDirection = "column";
  imgContainer.style.alignItems = "center";
  imgContainer.style.marginTop = "5vh";

  let imgOverlay = document.createElement("img");
  imgOverlay.src = img.src;
  imgOverlay.style.maxWidth = "80vw";
  imgOverlay.style.maxHeight = "70vh";
  imgOverlay.style.borderRadius = "15px";
  imgOverlay.style.border = "solid 1px var(--blush)";

  let description = img.parentElement.querySelector("p");
  let descriptionClone = description.cloneNode(true);
  imgContainer.appendChild(imgOverlay);
  imgContainer.appendChild(descriptionClone);
  overlay.appendChild(imgContainer);

  document.body.appendChild(overlay);
  overlay.style.display = "flex";

  overlay.onclick = () => {
    overlay.style.display = "none";
    overlay.remove();
  };
};

// Fungsi untuk mencari dalam tabel
function filterTable() {
  const input = document.querySelector(".search-input").value.toLowerCase();
  const rows = document.querySelectorAll("table tbody tr");

  rows.forEach((row) => {
    const cells = row.getElementsByTagName("td");
    let found = false;
    for (let cell of cells) {
      if (cell.innerText.toLowerCase().includes(input)) {
        found = true;
        break;
      }
    }
    row.style.display = found ? "table-row" : "none";
  });
}

// Fungsi untuk menyalin nomor rekening
function copyRekening() {
  const copyText = document.getElementById("nomor-rekening");
  navigator.clipboard.writeText(copyText.textContent);
  alert("Nomor rekening telah disalin: " + copyText.textContent);
}

// Fungsi untuk menambahkan komentar
function addComment() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const ucapanText = document.getElementById("ucapanText").value;

  if (firstName && lastName && ucapanText) {
    const ucapanElement = document.createElement("div");
    ucapanElement.className = "ucapan";
    ucapanElement.innerHTML = `
      <div class="ucapan-author">${firstName} ${lastName}</div>
      <div class="ucapan-text">${ucapanText}</div>
    `;
    document.getElementById("ucapansList").prepend(ucapanElement);
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("ucapanText").value = "";
  } else {
    alert("Mohon isi semua kolom");
  }
}