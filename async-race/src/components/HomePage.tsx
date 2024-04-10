import ColorForm from "./ColorForm";
import SingleCar from "./SingleCar";

const HomePage = () => {
  return (
    <div>
      <ColorForm actionText="Create" placeholderText="Car name" />
      <ColorForm actionText="Change" placeholderText="Change Car" />
      <SingleCar />
    </div>
  );
};

export default HomePage;
