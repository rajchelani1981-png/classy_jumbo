//data file link
const landingPageSildingFileLink = "/json/landing_sliding.json";

//data store variable
let landingPageSlidingData = null;

function animateCharacters(container) {
  const elements = container.querySelectorAll(".char-animate");

  elements.forEach(el => {
    const text = el.dataset.text || el.textContent;
    el.dataset.text = text;          // store original text
    el.innerHTML = "";               // clear previous chars

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;

      // 🔥 RevSlider-style stagger
      span.style.animationDelay = `${i * 0.06}s`;

      el.appendChild(span);
    });
  });
}

let fetchSlidingImageForLandingPage = async () =>{
  try{
    let response = await fetch(landingPageSildingFileLink);

    let data = await response.json();

    if(data)
      landingPageSlidingData = data;
  }
  catch (error){
    console.error("error during fetching the sliding page data", error);
  }
}

let loadSlidingHtmlData = (data) => {
  //selector
  const landingSlidingSelector = document.querySelector(".hero-slider");

  landingSlidingSelector.innerHTML = `
  <!-- Splash overlay -->
  <div class="slider-splash"></div>
  `;
  
  data.forEach(e => {
    landingSlidingSelector.innerHTML += `
      <div class="slide">
        ${e.video_desktop ? `<video autoplay muted loop playsinline>
            <source src="${e.video_desktop}" type="${e.type}">
          </video>` 
          : 
          `
          <picture>
            ${e.mobile_img ? `<source media="(max-width: 768px)" srcset="${e.mobile_img}">` : ""}
            ${e.tablet_img ? `<source media="(max-width: 1024px)" srcset="${e.tablet_img}">` : ""}
            <img src="${e.img}">
          </picture>

          <div class="slide-content">
            ${e.heading ? `<h1 class="char-animate">${e.heading}</h1>` : ``}
            ${e.subheading ? `<p class="char-animate delay-1">${e.subheading}</p>` : ``}
          </div>
          `}
        
      </div>
    `;
  });
}

async function initHeroSlider() {
  if(!landingPageSlidingData)
    await fetchSlidingImageForLandingPage();

  loadSlidingHtmlData(landingPageSlidingData);
  let current = 0;
  const slides = document.querySelectorAll(".hero-slider .slide");

  if (!slides.length) return;

  function activateSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    const activeSlide = slides[index];
    activeSlide.classList.add("active");

    // 🔥 Restart character animation every time
    animateCharacters(activeSlide);
  }

  activateSlide(current);

  setInterval(() => {
    current = (current + 1) % slides.length;
    activateSlide(current);
  }, 4500);

  videoFunctionInit();
  loadHomeActionAndHeroImage();
  document.querySelectorAll(".slide video").forEach(v => v.pause());
}

/* ===============================
   VIDEO PLAYLISTS (PER BLOCK)
================================ */
let videoPlaylists =  null;
let videoLink = "/json/landing_page_video_trending_data.json";

let fetchVideo = async () =>{
  try{
    let response = await fetch(videoLink);
    let data = await response.json();

    if(data)
      videoPlaylists = data;
  }
  catch (error){
    console.error("error fetching the video", error);
  }
}

/* ===============================
   INITIALIZE PLAYLIST PLAYBACK
================================ */

let videoFunctionInit = async () =>{
  if (!videoPlaylists)
    await fetchVideo();

  document.querySelectorAll(".cj2-video-box").forEach(videoBox => {
    const video = videoBox.querySelector("video");
    const playlistKey = videoBox.dataset.playlist;
    const playlist = videoPlaylists[playlistKey];

    if (!playlist || playlist.length === 0) return;

    let currentIndex = 0;

    // Load & play video
    function playVideo(index) {
      video.src = playlist[index];
      video.load();
      video.play().catch(() => {});
    }

    // When video ends → play next
    video.addEventListener("ended", () => {
      currentIndex++;
      if (currentIndex >= playlist.length) {
        currentIndex = 0; // loop back
      }
      playVideo(currentIndex);
    });

    // Start first video
    playVideo(currentIndex);
  });

  console.log("hey");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target.querySelector("video");
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".cj2-video-box").forEach(box => observer.observe(box));
}

let loadHomeActionAndHeroImage = async () =>{
  if(!menuData)
    await fetchMenu();

  if(!companyDataForLogo)
    await fetchCompanyInformation();

  let productMenu = menuData.find( pr => pr.type == "product" );
  let contactMenu = menuData.find( co => co.type == "contact" );

  document.querySelectorAll(".product-link").forEach(e =>{
    e.href = productMenu.route;
  });

  document.querySelectorAll(".contact-link").forEach(e =>{
    e.href = contactMenu.route;
  });

  document.querySelectorAll(".hero-image").forEach(e =>{
    e.src = companyDataForLogo.hero_image;
  });
}