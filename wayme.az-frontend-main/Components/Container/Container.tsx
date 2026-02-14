import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 sm:px-10 ${className ?? ""}`}>
      {children}
    </div>
  );
};

export default Container;
