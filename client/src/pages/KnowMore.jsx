import SideBarClient from "../components/SideBarClient";

const Events = () => {
  return (
    <div className="grid md:grid-flow-col lg:grid-flow-col ">
      <SideBarClient />
      <div className="pt-20 p-2 w-full col-span-12">
        <div className="rounded-xl border p-2 w-full flex flex-col items-center">
          <h1 className="text-4xl">About Us</h1>
          <p className="text-xl">
            At BROTEIN BISTRO, we prioritize health and fitness with a diverse
            menu of nutritious meals and protein-packed smoothies. Enjoy
            delicious, wellness-focused food whether you're a gym-goer,
            health-conscious, or simply love good food. Experience the perfect
            fusion of health and flavor at BROTEIN BISTRO!
          </p>
          {/* <img alt="event" src="/bg10.jpg" /> */}
        </div>
      </div>
    </div>
  );
};

export default Events;
