const apiKey = "a1653376-3bab-476e-80a2-f666bd77dc6e";
const api = new BandSiteApi(apiKey);
const commentsContainer = document.querySelector(".comments");

async function displayAllComments() {
  try {
    const comments = await api.getComments();
    comments.sort(function (a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    commentsContainer.innerHTML = "";
    comments.forEach(displayComment);
  } catch (error) {
    console.log(error);
  }
}
displayAllComments();

function displayComment(comment) {
  const commentElements = createCommentElement(comment);
  commentsContainer.appendChild(commentElements);
}

const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const nameInput = document.getElementById("comment-name");
  const textInput = document.getElementById("comment-text");
  nameInput.classList.remove("error");
  textInput.classList.remove("error");

  const name = event.target.name.value;
  const text = event.target.text.value;
  if (!name || !text) {
    if (!name) {
      nameInput.classList.add("error");
    }
    if (!text) {
      textInput.classList.add("error");
    }
    return;
  }

  const newComment = {
    name: name,
    comment: text,
  };

  await api.postComment(newComment);
  await displayAllComments();

  nameInput.value = "";
  textInput.value = "";
});

function createCommentElement(comment) {
  const commentElements = document.createElement("article");
  commentElements.className = "comment";
  commentElements.id = "comment-" + comment.id;
  commentElements.appendChild(createAvatar());
  commentElements.appendChild(createCommentInfo(comment));
  return commentElements;
}

function createAvatar() {
  const avatarElement = document.createElement("div");
  avatarElement.className = "comment__avatar comment__avatar--empty";
  return avatarElement;
}

function createCommentInfo(comment) {
  const commentInfoElement = document.createElement("div");
  commentInfoElement.className = "comment__info";
  commentInfoElement.appendChild(createCommentHeader(comment));
  commentInfoElement.appendChild(createCommentText(comment));
  commentInfoElement.appendChild(createButtonContainer(comment));
  return commentInfoElement;
}

function createCommentHeader(comment) {
  const commentHeaderElement = document.createElement("div");
  commentHeaderElement.className = "comment__header";
  commentHeaderElement.appendChild(createNameElement(comment.name));
  commentHeaderElement.appendChild(createDateElement(comment.timestamp));
  return commentHeaderElement;
}

function createCommentText(comment) {
  const commentTextElement = document.createElement("p");
  commentTextElement.className = "comment__text";
  commentTextElement.innerText = comment.comment;
  return commentTextElement;
}

function createNameElement(name) {
  const commentNameElement = document.createElement("h3");
  commentNameElement.className = "comment__name";
  commentNameElement.innerText = name;
  return commentNameElement;
}

function createDateElement(timestamp) {
  const dateElement = document.createElement("div");
  dateElement.className = "comment__date";
  dateElement.innerHTML = formattedDate(timestamp);
  return dateElement;
}

function formattedDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + "/" + day + "/" + year;
}

function createButtonContainer(comment) {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "comment__submit";

  buttonsContainer.appendChild(createLikesCount(comment.likes));
  buttonsContainer.appendChild(createButton("./assets/icons/svg/icon-like.svg", function () {
    handleLike(comment.id);
  }));
  buttonsContainer.appendChild(createButton("./assets/icons/svg/icon-delete.svg", function () {
    handleDelete(comment.id);
  }));

  return buttonsContainer;
}

function createLikesCount(likes) {
  const likesCount = document.createElement("div");
  likesCount.className = "comment__likes-count";
  likesCount.innerHTML = likes;
  return likesCount;
}

function createButton(imgSrc, onClick) {
  const button = document.createElement("button");
  button.className = "comment__button";
  const icon = document.createElement("img");
  icon.src = imgSrc;
  button.appendChild(icon);
  button.addEventListener("click", onClick);
  return button;
}

async function handleLike(commentId) {
  try {
    const responseData = await api.likeComment(commentId);
    const likesCount = document.querySelector("#comment-" + commentId + " .comment__likes-count");
    likesCount.innerHTML = responseData.likes;
  } catch (error) {
    console.log("Error liking comment:", error);
  }
}

async function handleDelete(commentId) {
  try {
    await api.deleteComment(commentId);
    const commentElement = document.getElementById("comment-" + commentId);
    commentElement.parentNode.removeChild(commentElement);
  } catch (error) {
    console.log("Error deleting comment:", error);
  }
}
