import { Link, useLocation } from "react-router-dom";
import { BsLayoutSidebarInset } from "react-icons/bs";

import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (expanded) {
      const timeout = setTimeout(() => {
        setShowText(true);
      }, 10);
      return () => {
        clearTimeout(timeout);
        setShowText(false);
      };
    }
  }, [expanded]);

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "text-lg bg-[#F6F6F6] p-2 m-1 shadow-sm border rounded-lg block"
      : "text-lg p-2 m-1 w-full block";
  };

  return (
    <div className="sm:w-full md:h-screen lg:h-screen sm:h-full rounded-sm   left-0 top-0 pt-24 shadow-md border ms:sticky lg:sticky  duration-300">
      <nav
        className={`transition-all duration-0 flex flex-col h-full p-2 ${
          expanded ? "w-full" : "w-20"
        }`}
      >
        <div
          onClick={() => setExpanded((p) => !p)}
          className="w-8 h-8 p-2 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full"
        >
          <BsLayoutSidebarInset size={18} fill="#444" />
        </div>
        <ul className="flex md:flex-col lg:flex-col sm:flex-row w-full ">
          <li>
            <Link
              to="/subscriptionse-requests"
              className={`${getLinkClasses("/subscriptionse-requests")} flex `}
            >
              <img alt="requests" className="w-6 mr-5" src="request.svg" />
              {expanded && showText && <p className="duration-300">Requests</p>}
            </Link>
          </li>
          <li>
            <Link
              to="/active-subscriptions"
              className={`${getLinkClasses("/active-subscriptions")} flex`}
            >
              <img alt="requests" className="w-6 mr-5" src="active.svg" />
              {expanded && showText && <p>Active</p>}
            </Link>
          </li>
          <li>
            <Link
              to="/meal-records"
              className={`${getLinkClasses("/meal-records")} flex`}
            >
              <img alt="requests" className="w-6 mr-5" src="records.svg" />
              {expanded && showText && <p>Records</p>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
