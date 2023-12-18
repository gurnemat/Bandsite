import BandSiteApi from "./band-site-api.js";

function createElement(element, text, className) {
  const newElement = document.createElement(element);
  newElement.innerText = text;
  newElement.classList.add(className);
  return newElement;
}

const commentSection = document.querySelector(".comments");
const commentTitle = createElement(
  "h2",
  "Join the Conversation",
  "comments__title"
);

commentSection.prepend(commentTitle);

const commentForm = document.querySelector(".comments__form");
const commentList = document.querySelector(".comments__list");

function time(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let timeDiff = Math.floor(seconds / 31536000);

  if (timeDiff > 1) {
    return `${timeDiff} year ago`;
  }
  timeDiff = Math.floor(seconds / 2592000);
  if (timeDiff > 1) {
    return `${timeDiff} months ago`;
  }
  timeDiff = Math.floor(seconds / 86400);
  if (timeDiff > 1) {
    return `${timeDiff} days ago`;
  }
  timeDiff = Math.floor(seconds / 3600);
  if (timeDiff > 1) {
    return `${timeDiff} hours ago`;
  }
  timeDiff = Math.floor(seconds / 60);
  if (timeDiff > 1) {
    return `${timeDiff} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

const bandSiteApi = new BandSiteApi("9384ce1d-6b70-47f1-b3a6-fe705c673dfe");

async function gettingComments() {
  const response = await bandSiteApi.getComments();
  appendCommentItems(response);
}
gettingComments();

function appendCommentItems(response) {
  commentList.innerText = "";

  response.sort(function (a, b) {
    const dateA = new Date(a.timesStamp);
    const dateB = new Date(b.timesStamp);
    return new Date(b.timesStamp).getTime() - new Date(a.timesStamp).getTime();
  });

  response.forEach(function (cmt) {
    const content = createElement("div", "", "comments__content");
    const imgContainer = createElement("div", "", "comments__img");

    const commentItem = document.createElement("div");
    commentItem.classList.add("comments__item");

    const userName = createElement("h4", cmt.name, "comments__user");
    const cmtDate = createElement(
      "p",
      time(new Date(cmt.timesStamp)),
      "comments__date"
    );
    const cmtText = createElement("p", cmt.comment, "comments__text");

    commentItem.appendChild(userName);
    commentItem.appendChild(cmtDate);
    commentItem.appendChild(cmtText);
    content.appendChild(imgContainer);
    content.appendChild(commentItem);
    commentList.appendChild(content);
  });
}

commentForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!event.target.userName.value) {
    event.target.userName.style.border = "1px solid #d22d2d";
    return;
  } else if (!event.target.userComment.value) {
    event.target.userComment.style.border = "1px solid #d22d2d";
    return;
  }

  try {
    const postResponse = await bandSiteApi.postComment({
      name: event.target.userName.value,
      comment: event.target.userComment.value,
    });

    event.target.userName.value = "";
    event.target.userName.style.border = "1px solid #e1e1e1";

    event.target.userComment.value = "";
    event.target.userComment.style.border = "1px solid #e1e1e1";

    await gettingComments();
  } catch (error) {
    console.error("Error posting comment:", error);
  }
});
