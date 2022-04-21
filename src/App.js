import React, { useState, useCallback } from "react";
import Modal from "react-better-modal";
import "react-better-modal/dist/index.css";

export default function App() {
  const [visible, setVisible] = useState(false);
  const onHandleVisibleChange = useCallback(() => {
    setVisible(!visible);
  });

  return (
    <div className="App">
      <h1>Basic Usage</h1>
      <button onClick={onHandleVisibleChange}>Open Modal</button>
      <Modal
        title="Basic Modal"
        visible={visible}
        okText="ok"
        cancelText="cancel"
        onCancel={onHandleVisibleChange}
      >
        <h1>Hello React Better Modal</h1>
      </Modal>
    </div>
  );
}
