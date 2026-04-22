document.addEventListener("DOMContentLoaded", function () {

  /* ====== MAPS ====== */
  function bukaMaps(){
  window.open("https://maps.app.goo.gl/wcawf9yirwPd7QWp8", "_blank");
}
  window.bukaMaps = bukaMaps;

  try {

    const slides = document.querySelectorAll(".slide");
    const navBtns = document.querySelectorAll(".nav button");
    let current = 0;

    /* ====== MUSIC CONTROL ====== */
    const music = document.getElementById("music");
    const musicBtn = document.getElementById("musicBtn");
    let isPlaying = false;

    if(musicBtn && music){
      musicBtn.addEventListener("click", () => {
        if(isPlaying){
          music.pause();
          musicBtn.innerText = "🔇";
        } else {
          music.play().catch(()=>{});
          musicBtn.innerText = "🔊";
        }
        isPlaying = !isPlaying;
      });
    }

    /* NAV */
   let isAnimating = false;

navBtns.forEach(btn=>{
  btn.addEventListener("click", function(){

    let i = Number(this.dataset.go);

    // ❗ cegah klik spam & klik slide sama
    if(i === current || isAnimating) return;

    isAnimating = true;

    let currentSlide = slides[current];
    let nextSlide = slides[i];

    // 🔥 animasi keluar
    currentSlide.classList.add("hide");

    setTimeout(()=>{

      // matikan slide lama
      currentSlide.classList.remove("active","hide");

      // aktifkan slide baru
      nextSlide.classList.add("active","show");

      // reset animasi masuk
      setTimeout(()=>{
        nextSlide.classList.remove("show");
        isAnimating = false;
      },700);

      current = i;

    },400);

  });
});

    /* OPENING + AUTO PLAY MUSIC */
const openBtn = document.getElementById("openBtn");

if(openBtn){
  openBtn.onclick = function(){

    // animasi amplop
    openBtn.classList.add("open");

    // hilangin opening
    const opening = document.getElementById("opening");
    if(opening){
      opening.classList.add("fade-out");

      setTimeout(() => {
        opening.style.display = "none";
      }, 800);
    }

    // play musik
    const music = document.getElementById("music");
    if(music){
      music.currentTime = 0;
      music.play().catch(()=>{});
    }

  }
}
    /* WA */
    const waBtn = document.getElementById("wa");
    if(waBtn){
      waBtn.onclick = ()=>{
        let n = document.getElementById("nama")?.value;
        let s = document.getElementById("status")?.value;
        let p = document.getElementById("pesan")?.value;

        if(!n){
          alert("Isi nama dulu");
          return;
        }

        let text = `Nama: ${n}\nStatus: ${s}\nUcapan: ${p}`;
        let url = "https://wa.me/+6282377038610?text=" + encodeURIComponent(text);

        window.open(url, "_blank");
      };
    }

    /* UCAPAN */
    const addBtn = document.getElementById("add");
    if(addBtn){
      addBtn.onclick = ()=>{
        let n = document.getElementById("nama")?.value;
        let p = document.getElementById("pesan")?.value;

        if(!n || !p){
          alert("Isi nama & ucapan");
          return;
        }

        let el = document.createElement("p");
        el.innerText = n + ": " + p;

        document.getElementById("listUcapan").appendChild(el);
      };
    }

    /* COPY */
    document.querySelectorAll(".copy").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        let val = btn.dataset.copy;
        if(!val) return;

        navigator.clipboard.writeText(val)
          .then(()=> alert("Disalin"))
          .catch(()=> alert("Gagal copy"));
      });
    });

    /* PARAM URL */
    let urlParams = new URLSearchParams(window.location.search);

    /* NAMA TAMU */
    let guest = urlParams.get("to");
    if(guest){
      let guestEl = document.getElementById("guest");
      let inputNama = document.getElementById("nama");

      if(guestEl) guestEl.innerText = decodeURIComponent(guest);
      if(inputNama) inputNama.value = decodeURIComponent(guest);
    }

    /* NAMA PENGUNDANG */
    let from = urlParams.get("from");
    if(from){
      let fromEl = document.getElementById("fromName");
      if(fromEl){
        fromEl.innerText = decodeURIComponent(from);
      }
    }

    /* ICON */
    if(window.lucide){
      lucide.createIcons();
    }

  } catch (err) {
    console.error("ERROR JS:", err);
    console.log(document.querySelectorAll('.slide.active').length);
  }

});

