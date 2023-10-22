"use client";
import SettingsModal from "./SettingsModal";

const NavigationSidebar = () => {
  return (
    <div className="flex h-screen flex-col bg-primary-1000 p-3">
      <SettingsModal />
    </div>
  );
};

export default NavigationSidebar;
