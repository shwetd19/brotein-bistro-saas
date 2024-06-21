import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "text-lg bg-[#f8f5f2] p-2 m-1 shadow-sm border rounded-lg block"
      : "text-lg p-2 m-1 w-full block";
  };

  return (
    <div className="sm:w-full md:w-60 lg:w-60 bg-white  md:h-screen lg:h-screen sm:h-full rounded-sm flex flex-col p-2 left-0 top-0 pt-24 shadow-md border ms:sticky lg:sticky">
      <nav className="w-full ">
        <ul className="flex md:flex-col lg:flex-col sm:flex-row w-full ">
          <li>
            <Link
              to="/subscriptionse-requests"
              className={`${getLinkClasses("/subscriptionse-requests")} flex `}
            >
              <img alt="requests" className="w-6 mr-5" src="request.svg" />
              requests
            </Link>
          </li>
          <li>
            <Link
              to="/active-subscriptions"
              className={`${getLinkClasses("/active-subscriptions")} flex`}
            >
              <img alt="requests" className="w-6 mr-5" src="active.svg" />
              active
            </Link>
          </li>
          <li>
            <Link
              to="/meal-records"
              className={`${getLinkClasses("/meal-records")} flex`}
            >
              <img alt="requests" className="w-6 mr-5" src="records.svg" />
              records
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
