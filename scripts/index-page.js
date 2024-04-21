// Comments Array
const comments = [
    {
        name: 'Victor Pinto',
        date: '11/02/2023',
        comment: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.'
    },
    {
        name: 'Christina Cabrera',
        date: '10/28/2023',
        comment: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
    },
    {
        name: 'Isaac Tadesse',
        date: '10/20/2023',
        comment: 'I can\'t stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can\'t get enough.'
    }
];

// New Comment
let addComment = form => {
    const timestamp = new Date();
    const comment = {
        name: form.name.value,
        date: `${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()}`,
        comment: form.textarea.value
    };
    comments.unshift(comment);
};

// Delete Comments
let clearComments = () => {
    const commentItems = document.querySelector(".comment__items");
    commentItems.innerHTML = '';
};

// Render Comments
let renderComments = commentsObj => {
    clearComments();
    
    const data = commentsObj ? commentsObj : comments;
    const className = "comment__";
    const mainContainer = document.querySelector(`.${className}items`);
    mainContainer.innerHTML += '<hr class="comment__divider">';
    data.forEach(comment => {
        const { name, date, comment: content } = comment;
        mainContainer.innerHTML += `
            <article class="${className}item">
                <div class="${className}thumbnail">
                    <div class="${className}avatar"></div>
                </div>
                <div class="${className}content">
                    <h3 class="${className}username">${name}</h3>
                    <span class="${className}timestamp">${date}</span>
                    <p class="${className}body">${content}</p>
                </div>
            </article>
            <hr class="${className}divider">
        `;
    });
};

// Submit Comments
document.querySelector(".comment__form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.target;
    addComment(form);
    renderComments();
    form.reset();
});

renderComments();