import React from "react";

export default ({ comments }) => {
  const renderData = comments.map((comment) => {
    let content;

    if (comment.status === "Approved") {
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = "The comment is being proceed by moderator";
    }

    if (comment.status === "Rejected") {
      content = "Your comment has been rejected ";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderData}</ul>;
};
