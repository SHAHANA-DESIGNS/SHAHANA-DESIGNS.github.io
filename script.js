const artRepo = "https://raw.githubusercontent.com/SHAHANA-DESIGNS/ARTS/main/";
const gallery = document.getElementById("galleryGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

for (let i = 1; i <= 15; i++) {
  const n = i;
  const item = document.createElement("button");
  item.className = "gallery-item";
  item.type = "button";
  item.innerHTML = `<img src="${artRepo}ART-${n}.JPEG" alt="Original artwork ${n}" loading="lazy">`;
  item.addEventListener("click", () => {
    lightboxImage.src = `${artRepo}ART-${n}.JPEG`;
    lightboxImage.alt = `Original artwork ${n}`;
    lightboxCaption.textContent = `Artwork ${String(n).padStart(2,"0")} · Shahana`;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
  });
  gallery.appendChild(item);
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  lightboxImage.src = "";
}
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");
menuToggle.addEventListener("click", () => {
  const open = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded","false");
}));
