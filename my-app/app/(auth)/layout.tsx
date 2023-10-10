import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-secondary-500 via-secondary-300 to-secondary-100">
      {children}
    </div>
  );
};

export default AuthLayout;
