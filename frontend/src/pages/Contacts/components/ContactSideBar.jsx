import { ContactRound, UserRoundPlus, UsersRoundIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const ContactSideBar = () => {
  const location = useLocation().pathname;
  
  const items = [
    {
      path: "/",
      label: "Demandes d'invitations",
      icon: <UsersRoundIcon />,
    },
    {
      path: "list",
      label: "Vos amis",
      icon: <ContactRound />,
    },
    {
      path: "suggestions",
      label: "Suggestions",
      icon: <UserRoundPlus />,
    },
  ];

  return (
    // grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
<div className="fixed left-0 p-3">
  {items.map((item) => (
    <Link
      key={item.path}
      to={`/contacts/${item.path}`}
      className={`self-start group block rounded-xl  hover:bg-blue-50 transition border-gray-200 shadow-sm border-2 p-4 ${location.endsWith(item.path) ? 'bg-blue-50  border-blue-200':'bg-slate-50'}`}
    >
      <div className="flex items-center gap-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
          {item.icon}
        </div>
          <div className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition">
            {item.label}
          </div>
      </div>
    </Link>
  ))}
</div>

  );
};

export default ContactSideBar;
