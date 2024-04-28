const apiKey = "a1653376-3bab-476e-80a2-f666bd77dc6e";
const api = new BandSiteApi(apiKey);

async function displayAllShows() {
  try {
    const shows = await api.getShows();
    console.log(shows);
    shows.forEach((show, index) => {
      displayShow(show, index);
    });
  } catch (error) {
    console.log(error);
  }
}
displayAllShows();

function createShowDetail(title, content) {
  const titleElement = document.createElement("h3");
  titleElement.innerText = title;
  titleElement.classList.add("show__" + title + "-title");

  const contentElement = document.createElement("div");
  contentElement.innerText = content;
  contentElement.classList.add("show__" + title + "-content");

  const containerElement = document.createElement("div");
  containerElement.classList.add("show__" + title);
  containerElement.appendChild(titleElement);
  containerElement.appendChild(contentElement);
  return containerElement;
}

function formattedDate(date) {
    let formatDate = new Date(date);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(formatDate);
  }

function displayShow(show) {
  const showElement = document.createElement("article");
  showElement.classList.add("show");

  const showDateElement = createShowDetail("date", formattedDate(show.date));
  const showVenueElement = createShowDetail("venue", show.place);
  const showLocationElement = createShowDetail("location", show.location);

  const showInfoContainer = document.createElement("div");
  showInfoContainer.classList.add("show__info");
  showInfoContainer.appendChild(showDateElement);
  showInfoContainer.appendChild(showVenueElement);
  showInfoContainer.appendChild(showLocationElement);

  const showButtonElement = document.createElement("button");
  showButtonElement.classList.add("show__button");
  showButtonElement.innerText = "BUY TICKETS";

  showElement.appendChild(showInfoContainer);
  showElement.appendChild(showButtonElement);
  showElement.addEventListener("click", () => selectShow(showElement));

  const showsContainer = document.querySelector(".shows__list");
  showsContainer.appendChild(showElement);
}

function selectShow(showElement) {
    document.querySelectorAll(".show--selected").forEach((element) => {
      element.classList.remove("show--selected");
    });
    showElement.classList.add("show--selected");
  }
