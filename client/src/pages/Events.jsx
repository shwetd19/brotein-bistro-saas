import SideBarClient from "../components/SideBarClient";

const Events = () => {
  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col ">
      <SideBarClient />
      <div className="pt-20 p-2 w-full col-span-12">
        <div className="p-2 w-full flex flex-col items-center">
          <h1 className="text-4xl p-2">Our Next Event!</h1>
          <h1 className="text-2xl p-2">event name</h1>
          <img alt="event" src="/bg10.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Events;
