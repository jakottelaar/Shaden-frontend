import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen bg-primary-100">{children}</div>;
};

export default layout;
