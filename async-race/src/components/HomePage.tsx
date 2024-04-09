import ColorForm from "./ColorForm";

const HomePage = () => {
  return (
    <div>
      <ColorForm actionText="Create" placeholderText="Car name" />
      <ColorForm actionText="Change" placeholderText="Change Car" />
    </div>
  );
};

export default HomePage;
