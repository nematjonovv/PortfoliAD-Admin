// import { useState } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [active, setActive] = useState("/add-new-project");
  const routes = [
    {
      to: "/add-new-project",
      label: "Add New Project",
      icon: "bi bi-folder-plus",
      iconFill: "bi bi-folder-plus",
    },
    {
      to: "/projects",
      label: "Projects",
      icon: "bi bi-list",
      iconFill: "bi bi-list",
    },
    {
      to: "/contact-info",
      label: "Contact Info",
      icon: "bi bi-person-lines-fill",
      iconFill: "bi bi-person-lines-fill",
    },
    {
      to: "/clients-request",
      label: "Clients Request",
      icon: "bi bi-envelope",
      iconFill: "bi bi-envelope",
    },
  ];
  return (
    <div className="border-r-2 border-gray-200">
      <h1 className="p-4 text-[20px] font-bold">PortfoliAD Admin</h1>
      <ul className="w-2xs px-4 space-y-2">
        {routes.map((route) => (
          <li key={route.to} className="w-[250px] text-gray-600">
            <Link
              to={route.to}
              onClick={() => setActive(route.to)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 ${
                active === route.to
                  ? "bg-[#febd9a] text-black border-[#fda870]"
                  : "bg-transparent  border-transparent hover:bg-[#ffbd977e] hover:text-black"
              }`}
            >
              <i
                className={active === route.to ? route.iconFill : route.icon}
              ></i>
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
