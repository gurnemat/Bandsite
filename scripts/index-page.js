const comments = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

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

function appendCommentItems() {
  commentList.innerText = "";

  comments.sort(function (a, b) {
    const dateA = new Date(a.dateStamp);
    const dateB = new Date(b.dateStamp);
    return dateB - dateA;
  });

  comments.forEach(function (cmt) {
    const content = createElement("div", "", "comments__content");
    const imgContainer = createElement("div", "", "comments__img");
    console.log(imgContainer);

    const commentItem = document.createElement("div");
    commentItem.classList.add("comments__item");

    const userName = createElement("h4", cmt.name, "comments__user");
    const cmtDate = createElement(
      "p",
      time(new Date(cmt.dateStamp)),
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

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newComment = {
    name: event.target.userName.value,
    dateStamp: new Date(),
    comment: event.target.userComment.value,
  };

  if (!event.target.userName.value) {
    event.target.userName.style.border = "1px solid #d22d2d";
    return;
  } else if (!event.target.userComment.value) {
    event.target.userComment.style.border = "1px solid #d22d2d";
    return;
  }
  comments.push(newComment);

  event.target.userName.value = "";
  event.target.userName.style.border = "1px solid #e1e1e1";

  event.target.userComment.value = "";
  event.target.userComment.style.border = "1px solid #e1e1e1";

  appendCommentItems();
});
appendCommentItems();

function createElement(element, text, className) {
  const newElement = document.createElement(element);
  newElement.innerText = text;
  newElement.classList.add(className);
  return newElement;
}
