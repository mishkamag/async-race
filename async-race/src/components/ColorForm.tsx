import "../App.css";

type ColorFormProps = {
  actionText: string;
  placeholderText: string;
};

const ColorForm = ({ actionText, placeholderText }: ColorFormProps) => {
  return (
    <form className="form">
      <input type="text" className="" placeholder={placeholderText} />
      <input type="color" className="form-color" />
      <button type="button" className="app-button">
        {actionText}
      </button>
    </form>
  );
};

export default ColorForm;
