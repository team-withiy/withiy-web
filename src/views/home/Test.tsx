"use client";

const Test: React.FC = () => {
  return (
    <button
      type="button"
      onClick={() => {
        throw new Error("Sentry Test Error");
      }}
    >
      Break the world
    </button>
  );
};

export default Test;
