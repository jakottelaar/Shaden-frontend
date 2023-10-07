const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="from-secondary-500 via-secondary-300 to-secondary-100 flex h-screen flex-col items-center justify-center bg-gradient-to-r">
      {children}
    </div>
  );
};

export default AuthLayout;
