const navbar = document.getElementById("navbar"),
  menu = document.querySelector(".menu-toggle"),
  links = document.querySelector(".nav-links");
window.addEventListener("scroll", () =>
  navbar.classList.toggle("scrolled", scrollY > 30),
);
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
document
  .querySelectorAll(".nav-links a")
  .forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open")),
  );
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
document.getElementById("year").textContent = new Date().getFullYear();
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formMessage = document.getElementById("formMessage");

    const submitButton = contactForm.querySelector("button[type='submit']");

    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = "Sending Inquiry...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formMessage.textContent =
          "Thanks for reaching out. Your inquiry has been sent successfully.";

        contactForm.reset();
      } else {
        formMessage.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      formMessage.textContent =
        "Unable to send your inquiry right now. Please try again.";
    }

    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  });
}
