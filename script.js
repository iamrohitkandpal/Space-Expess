const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visiblity = nav.getAttribute("data-visible");
  if (visiblity === "false") {
    nav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

let data;

fetch("./data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
    initializeTabs();
    initializeDots();
  })
  .catch((error) => console.error("Error fetching data:", error));

function updateDestination(index) {
  const destination = data.destinations[index];
  const picture = document.querySelector(
    ".grid-container--destination picture"
  );
  const source = picture.querySelector("source");
  const image = picture.querySelector("img");
  const name = document.querySelector(".destination-info h2");
  const description = document.querySelector(".destination-info p");
  const distance = document.querySelector(
    ".destination-meta div:nth-child(1) p"
  );
  const travel = document.querySelector(".destination-meta div:nth-child(2) p");
  
  console.log(destination, image, source);

  document
    .querySelector(".grid-container--destination")
    .classList.add("hidden");
  picture.classList.add("fade-out");
  setTimeout(() => {
    image.src = destination.images.png;
    source.srcset = destination.images.webp;
    image.alt = `the ${destination.name.toLowerCase()}`;
    name.textContent = destination.name;
    description.textContent = destination.description;
    distance.textContent = destination.distance;
    travel.textContent = destination.travel;
    document
      .querySelector(".grid-container--destination")
      .classList.remove("hidden");
    picture.classList.remove("fade-out");
  }, 500);

  console.log(destination, image, source);

}

function updateCrew(index) {
  const crewMember = data.crew[index];
  const picture = document.querySelector(".grid-container--crew picture");
  const source = picture.querySelector("source");
  const image = picture.querySelector("img");
  const role = document.querySelector(".crew-details h2");
  const name = document.querySelector(".crew-details p.fs-700");
  const bio = document.querySelector(".crew-details p:not(.fs-700)");
  
  console.log(crewMember, image, source);
  
  document.querySelector(".grid-container--crew").classList.add("hidden");
  picture.classList.add("fade-out");
  setTimeout(() => {
    image.src = crewMember.images.png;
    source.srcset = crewMember.images.webp;
    image.alt = crewMember.name;
    role.textContent = crewMember.role;
    name.textContent = crewMember.name;
    bio.textContent = crewMember.bio;
    document.querySelector(".grid-container--crew").classList.remove("hidden");
    picture.classList.remove("fade-out");
  }, 500);

    console.log(crewMember, image, source);
}

function initializeTabs() {
  document.querySelectorAll(".tab-list button").forEach((button, index) => {
    button.addEventListener("click", () => {
      document
        .querySelector('.tab-list button[aria-selected="true"]')
        .setAttribute("aria-selected", "false");
      button.setAttribute("aria-selected", "true");
      updateDestination(index);
    });
  });
}

function initializeDots() {
  document
    .querySelectorAll(".dot-indicators button")
    .forEach((button, index) => {
      button.addEventListener("click", () => {
        document
          .querySelector('.dot-indicators button[aria-selected="true"]')
          .setAttribute("aria-selected", "false");
        button.setAttribute("aria-selected", "true");
        updateCrew(index);
      });
    });
}
