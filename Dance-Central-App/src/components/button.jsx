import React from "react";

const Button = ({
  text,
  icon,
  image,
  onClick,
  className = "",
  style = {},
}) => {
  const handleClick = (e) => onClick && onClick(e);

  if (image) {
    return (
      <button
        className={`image-button ${className}`}
        type="button"
        onClick={handleClick}
        style={style}
      >
        {image && (
          <img
            src={image}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        )}
      </button>
    );
  } else if (icon) {
    return (
      <button
        className={`icon-button ${className}`}
        type="button"
        onClick={handleClick}
        style={style}
      >
        {icon && <span>{icon}</span>}
      </button>
    );
  } else {
    return (
      <button
        className={`text-button ${className}`}
        type="button"
        onClick={handleClick}
        style={style}
      >
        <span>{text}</span>
      </button>
    );
  }
};

export default Button;
