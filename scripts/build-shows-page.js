// Shows Array
const shows = [
    {
        date: 'Mon Sept 09 2024',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA'
    },
    {
        date: 'Tue Sept 17 2024',
        venue: 'Pier 3 East',
        location: 'San Francisco, CA'
    },
    {
        date: 'Sat Oct 12 2024',
        venue: 'View Lounge',
        location: 'San Francisco, CA'
    },
    {
        date: 'Sat Nov 16 2024',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Nov 29 2024',
        venue: 'Moscow Center',
        location: 'San Francisco, CA'
    },
    {
        date: 'Wed Dec 18 2024',
        venue: 'Press Club',
        location: 'San Francisco, CA'
    }
];

// Render Shows
let renderShows = showsObj => {
    const data = showsObj ? showsObj : shows;
    const className = "shows__";
    const showsContainer = document.querySelector(".shows");
    showsContainer.innerHTML = `
        <div class="${className}container">
            <h2 class="${className}title">Shows</h2>
            <div class="${className}content">
                <div class="${className}header">
                    ${['Date', 'Venue', 'Location', ' '].map(label => `<span class="${className}label">${label}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    const showsContentContainer = showsContainer.querySelector(`.${className}content`);

    data.forEach(show => {
        const showDate = `
            <li class="${className}date">
                <span class="${className}label ${className}label--mobile">Date</span>
                <span class="${className}date">${show.date}</span>
            </li>
        `;
        const showVenue = `
            <li class="${className}venue">
                <span class="${className}label ${className}label--mobile">Venue</span>
                <span class="${className}place">${show.venue}</span>
            </li>
        `;
        const showLocation = `
            <li class="${className}location">
                <span class="${className}label ${className}label--mobile">Location</span>
                <span class="${className}city">${show.location}</span>
            </li>
        `;
        const showButton = `
            <a href="#" class="${className}button">Buy Tickets</a>
        `;
        const showDivider = `<hr class="${className}divider">`;

        const showsInfoContainer = document.createElement("ul");
        showsInfoContainer.classList.add(`${className}info`);
        showsInfoContainer.addEventListener("click", event => {
            event.stopPropagation();
            document.querySelectorAll(`.${className}info--selected`).forEach(element => {
                element.classList.remove(`${className}info--selected`);
            });
            showsInfoContainer.classList.add(`${className}info--selected`);
        });

        showsInfoContainer.innerHTML = showDate + showVenue + showLocation + showButton;
        showsContentContainer.appendChild(showsInfoContainer);
        showsContentContainer.insertAdjacentHTML('beforeend', showDivider);
    });
};

renderShows();