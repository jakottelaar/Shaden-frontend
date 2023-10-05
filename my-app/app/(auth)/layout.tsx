const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#5900FF]">
      {children}
    </div>
  );
};

export default AuthLayout;
