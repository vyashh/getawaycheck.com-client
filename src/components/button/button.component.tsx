import "./button.styles.scss";

interface Props {
  type: string;
  width: string;
  text: string;
}

const Button: React.FC<Props> = ({ type, width, text }) => {
  const buttonType = type === "primary" ? "primary-button" : "secondary-button";
  return (
    <div style={{ width: width }} className={`custom-button ${buttonType}`}>
      {text}
    </div>
  );
};

export default Button;
