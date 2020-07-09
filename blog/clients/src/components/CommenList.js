import React from "react";

export default ({ comments }) => {
  const renderData = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderData}</ul>;
};
