import icon from "../../images/icon-complete.svg";
import "../../SCSS/ThankYouModal.scss";

const ThankYouModal = (props) => {
  const { modal, onClick, firstName } = props;
  return (
    <section className={modal}>
      <img className="modal__img" src={icon} alt="Checkmark" />
      <h1 className="modal__header">
        Thank You <br /> {firstName}
      </h1>
      <h2 className="modal__msg">
        We've added your card details <br /> Click continue to add another card
      </h2>
      <button onClick={onClick} className="modal__continue btn btnLarge">
        Continue
      </button>
    </section>
  );
};

export default ThankYouModal;
