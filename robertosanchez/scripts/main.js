document.querySelectorAll(".panel").forEach(panel => {
  gsap.to(panel.querySelector("video"), {
    scale: 1.2,
    scrollTrigger: {
      trigger: panel,
      scrub: true
    }
  });
});