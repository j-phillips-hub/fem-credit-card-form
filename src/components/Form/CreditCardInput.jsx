import "../../SCSS/CreditCardInput.scss";

const CreditCardInput = (props) => {
  const { label } = props;
  return (
    <div>
      <label label={label} className="creditCardLabel">
        {label}
      </label>
      <input {...props} type="text" />
    </div>
  );
};
export default CreditCardInput;
