gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".panel h1").forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: el,
      start: "top 80%"
    }
  });
});