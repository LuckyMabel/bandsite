const apiKey = "a1653376-3bab-476e-80a2-f666bd77dc6e";
const api = new BandSiteApi(apiKey);
const commentsContainer = document.querySelector(".comments");

async function displayAllComments() {
  try {
    const comments = await api.getComments();
    comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    console.log(comments);
    commentsContainer.innerHTML = "";
    comments.forEach((comment) => {
      displayComment(comment);
    });
  } catch (error) {
    console.log(error);
  }
}
displayAllComments();

function displayComment(comment) {
  const commentElement = document.createElement("article");
  commentElement.classList.add("comment");
  commentElement.id = `comment-${comment.id}`;

  const avatarElement = createAvatar();
  const commentInfoElement = createCommentInfo(comment);

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(commentInfoElement);
  commentsContainer.appendChild(commentElement);
}

const commentForm = document.getElementById("comment-form");

commentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrorMessages();

  const name = event.target.name.value;
  const text = event.target.text.value;

  if (name === "" || text === "") {
    if (name === "") {
      showError(document.getElementById("comment-name"));
    }

    if (text === "") {
      showError(document.getElementById("comment-text"));
    }
    return;
  }

  const newComment = {
    name: name,
    comment: text,
  };

  await api.postComment(newComment);
  await displayAllComments();

  event.target.name.value = "";
  event.target.text.value = "";
});

function clearErrorMessages() {
  document.getElementById("comment-text").classList.remove("error");
  document.getElementById("comment-name").classList.remove("error");
}

function showError(element) {
  element.classList.add("error");
}

function createCommentInfo(comment) {
  const commentInfoElement = document.createElement("div");
  commentInfoElement.classList.add("comment__info");

  commentInfoElement.appendChild(createCommentHeader(comment));
  commentInfoElement.appendChild(createCommentText(comment));
  commentInfoElement.appendChild(createButtonContainer(comment));

  return commentInfoElement;
}

function createAvatar() {
  const avatarElement = document.createElement("div");
  avatarElement.classList.add("comment__avatar");
  avatarElement.classList.add("comment__avatar--empty");
  return avatarElement;
}

function createCommentText(comment) {
  const commentTextElement = document.createElement("p");
  commentTextElement.classList.add("comment__text");
  commentTextElement.innerText = comment.comment;
  return commentTextElement;
}

function createCommentHeader(comment) {
  const commentHeaderElement = document.createElement("div");
  commentHeaderElement.classList.add("comment__header");

  const commentNameElement = document.createElement("h3");
  commentNameElement.classList.add("comment__name");
  commentNameElement.innerText = comment.name;

  const dateElement = document.createElement("div");
  dateElement.classList.add("comment__date");
  dateElement.innerHTML = formattedDate(comment.timestamp);

  commentHeaderElement.appendChild(commentNameElement);
  commentHeaderElement.appendChild(dateElement);
  return commentHeaderElement;
}

function createButtonContainer(comment) {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("comment__submit");

  buttonsContainer.appendChild(createLikesCount(comment.likes));
  buttonsContainer.appendChild(createButton("./assets/icons/SVG/icon-like.svg", () => handleLike(comment.id, buttonsContainer)));
  buttonsContainer.appendChild(createButton("./assets/icons/SVG/icon-delete.svg", () => handleDelete(comment.id)));

  return buttonsContainer;
}

function createButton(imgSrc, onClick) {
  const button = document.createElement("button");
  button.classList.add("comment__button");
  const icon = document.createElement("img");
  icon.src = imgSrc;
  button.appendChild(icon);

  if (onClick) {
    button.addEventListener("click", onClick);
  }

  return button;
}

function createLikesCount(count) {
  const likesCount = document.createElement("div");
  likesCount.classList.add("comment__likecount");
  likesCount.innerHTML = count;
  return likesCount;
}

function formattedDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}

async function handleLike(commentId, likeButton, buttonsContainer) {
  try {
    const responseData = await api.likeComment(commentId);
    buttonsContainer.querySelector(".comment__likecount").innerHTML = responseData.likes;
    likeButton.classList.add("comment__button--liked");
    console.log(responseData);
  } catch (error) {
    console.log("Error liking comment:", error);
  }
}

async function handleDelete(commentId) {
  try {
    await api.deleteComment(commentId);
    document.getElementById(`comment-${commentId}`).classList.add("deleted");
  } catch (error) {
    console.log("Error deleting comment:", error);
  }
}
