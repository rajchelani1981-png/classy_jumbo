let moreDetailInit = () =>{
console.log("test");
    let index = 0;
    const slides = document.getElementById("more-slides");
    const thumbs = document.querySelectorAll(".more-thumb");
    const total = slides.children.length;

    function updateSlider() {
        slides.style.transform = `translateX(-${index * 100}%)`;
        thumbs.forEach((t, i) => t.classList.toggle("active", i === index));

        // Pause all videos except active
        document.querySelectorAll("video").forEach(v => v.pause());
    }

    function nextSlide() {
        index = (index + 1) % total;
        updateSlider();
    }

    function prevSlide() {
        index = (index - 1 + total) % total;
        updateSlider();
    }

    thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => {
            index = i;
            updateSlider();
        });
    });

    let moreNext = document.querySelector(".more-next").addEventListener("click", () =>{
        console.log("tst")
        nextSlide();
    });
    let morePrev = document.querySelector(".more-prev").addEventListener("click", () =>{
        prevSlide();
    });
    console.log(moreNext);
    console.log(morePrev);

    updateSlider();
}