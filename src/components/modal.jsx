import React from "react";
import "../App.css";

const Modal = ({
  top,
  show,
  handleClose,
  addToWeek,
  selectedWeek,
  setSelectedWeek,
}) => {
  return (
    <div style={{ top }} className={`modal-container ${show ? "show" : ""}`}>
      <div className={`modal ${show ? "show" : ""}`}>
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <div className="title">Select Week</div>
          <div className="tags-container">
            {Array.from({ length: 4 }, (_, index) => {
              return (
                <div
                  onClick={() => setSelectedWeek(index + 1)}
                  key={index}
                  className={`tag ${
                    selectedWeek === index + 1 ? "selected" : ""
                  }`}
                >
                  Week {index + 1}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              handleClose();
              addToWeek();
            }}
            className="btn"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
