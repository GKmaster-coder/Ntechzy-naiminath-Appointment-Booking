import React, { useState, useEffect } from "react";
import {
  HiMenu,
  HiX,
  HiCalendar,
  HiOfficeBuilding,
  HiBan,
} from "react-icons/hi";
import { MdOutlineDownloadDone } from "react-icons/md";
import OnlineAppointments from "../components/AdminDashboard/OnlineAppointments";
import OfflineAppointments from "../components/AdminDashboard/OfflineAppointments";
import DisableSlot from "../components/AdminDashboard/DisableSlot";
import CompletedAppointments from "../components/AdminDashboard/CompletedAppointments";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("online");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Close mobile sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderMainContent = () => {
    switch (activeComponent) {
      case "online":
        return <OnlineAppointments />;
      case "offline":
        return <OfflineAppointments />;
      case "disable":
        return <DisableSlot />;
         case "completed":
        return <CompletedAppointments />;
      default:
        return <OnlineAppointments />;
    }
  };

  const navItems = [
    { key: "online", label: "Online Appointments", icon: HiCalendar },
    { key: "offline", label: "Offline Appointments", icon: HiOfficeBuilding },
    { key: "disable", label: "Disable Slot/Off Day", icon: HiBan },
    { key: "completed", label: "Completed", icon: MdOutlineDownloadDone },
  ];

  const handleNavigation = (key) => {
    setActiveComponent(key);
    setMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const toggleDesktopSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Desktop Sidebar component
  const DesktopSidebar = () => (
    <div
      className={`
      hidden md:flex flex-col bg-white shadow-lg transition-all duration-300
      ${sidebarOpen ? "w-64" : "w-20"}
    `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          )}
          <button
            onClick={toggleDesktopSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
          >
            {sidebarOpen ? (
              <HiX className="w-5 h-5" />
            ) : (
              <HiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.key}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                activeComponent === item.key
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              onClick={() => handleNavigation(item.key)}
            >
              <IconComponent
                className={`w-5 h-5 ${sidebarOpen ? "mr-3" : ""}`}
              />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar component
  const MobileSidebar = () => (
    <div
      className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden
      ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={toggleMobileSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.key}
              className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                activeComponent === item.key
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              onClick={() => handleNavigation(item.key)}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile overlay
  const MobileOverlay = () => (
    <div
      className={`
        fixed inset-0 z-40 transition-opacity duration-300 md:hidden
        ${mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      onClick={() => setMobileSidebarOpen(false)}
    />
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      <MobileOverlay />

      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 md:hidden"
              >
                <HiMenu className="w-5 h-5" />
              </button>

              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {navItems.find((item) => item.key === activeComponent)?.label}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ">
                <span className="text-white text-sm font-bold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto w-full">{renderMainContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
