"use client";
import React, { useState, useCallback } from "react";

const ChildButton = React.memo(({ onAction }) => {
  console.log("ChildButton dirender");
  return <button onClick={onAction}>Jalankan Aksi</button>;
});

export default function Parent() {
  const [count, setCount] = useState(0);

  const handleAction = useCallback(() => {
    console.log("Aksi dijalankan");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah Count</button>
      <ChildButton onAction={handleAction} />
    </div>
  );
}
