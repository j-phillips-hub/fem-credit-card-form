import React from "react";
import CreditCardBack from "./images/bg-card-back.png";
import CreditCardLogo from "./images/card-logo.svg";
import CreditCardInput from "./components/Form/CreditCardInput";
import ThankYouModal from "./components/ThankYouModal/ThankYouModal";
import { inputData } from "./components/Form/inputData";
import "./SCSS/App.scss";
import './SCSS/CreditCardForm.scss';
import './SCSS/CreditCardInput.scss';
import './SCSS/buttons.scss';

const INIT__CARD = {
  cvc: '',
  cardNumber: '',
  cardName: '',
  cardExpiryMonth: '',
  cardExpiryYear: '',
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cardData: INIT__CARD,
      modalVisible: false,
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      let mask = e.target.value.split(' ').join('');

      if (mask.length) {
        mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
        this.setState((prevState) => {
          return { cardData: { ...prevState.cardData, [name]: mask } }
        })
      } else {
        this.setState((prevState) => {
          return { cardData: { ...prevState.cardData, [name]: '' } }
        })
      }

    } else {
      this.setState((prevState) => {
        return { cardData: { ...prevState.cardData, [name]: value } }
      })
    }

    if (name !== 'cardName' &&
      value.match(/[a-zA-Z~`!$@#%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      this.setState((prevState) => {
        return { cardData: { ...prevState.cardData, [name]: value.replace(/[^\d]/g, '') } }
      })
    }
    e.preventDefault()
  }

  handleSubmit = (e) => {
    const inputs = document.getElementsByTagName('input');
    for (const input of inputs) {
      if (input.value === '') {
        this.setState({ modalVisible: false });
        input.classList.add('error');
      } else {
        this.setState({ modalVisible: true });
        input.classList.remove('error');
      }
    }
    e.preventDefault();
  }

  handleModalClose = () => {
    window.location.reload();
    this.setState({
      modalVisible: false,
      cardData: INIT__CARD
    });
  }

  render() {
    const { cardData, modalVisible } = this.state;
    const inputs = document.getElementsByTagName('input');

    const handleMaxLength = () => {
      for (const input of inputs) {
        const att = input.getAttribute('name');

        switch (att) {
          case 'cvc':
            input.setAttribute('maxlength', '3');
            input.setAttribute('minlength', '3');
            break;
          case 'cardNumber':
            input.setAttribute('maxlength', '19');
            input.setAttribute('minlength', '16');
            break;
          case 'cardExpiryMonth':
            input.setAttribute('maxlength', '2');
            input.setAttribute('minlength', '2');
            break;
          case 'cardExpiryYear':
            input.setAttribute('maxlength', '2');
            input.setAttribute('minlength', '2');
            break;
          default: input.setAttribute('maxlength', '-1');
        }
      }
    }
    handleMaxLength()

    const handleCardText = (state, seperator, value) =>
      state === ''
        ? value + seperator
        : state + seperator;

    return (
      <main className="App">
        <aside className="bg hero">
          <div className="heroContainer">
            <img className="cardImg cardImg--back"
              src={CreditCardBack}
              alt="Credit Card Back"
            />
            <small className="cvc">
              {handleCardText(cardData.cvc, "", "000")}
            </small>

            <div className="bg cardImg cardImg--front">
              <div className="cardInfo">
                <img className="cardInfo__logo"
                  src={CreditCardLogo}
                  alt="Card logo"
                />

                <div className="cardInfo__num">
                  <small>
                    {handleCardText(cardData.cardNumber, "", "0000 0000 0000 0000")}
                  </small>
                </div>

                <div>
                  <small className="cardInfo__name">
                    {handleCardText(cardData.cardName, "", "Jane Appleseed")}
                  </small>

                  <div className="cardInfo__expiry">
                    <small className="cardInfo__expiry--month">
                      {handleCardText(cardData.cardExpiryMonth, "/", "00")}
                    </small>

                    <small className="cardInfo__expiry--year">
                      {handleCardText(cardData.cardExpiryYear, "", "00")}
                    </small>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </aside>

        <section>
          <form onSubmit={this.handleSubmit} className={modalVisible ? 'displayNone' : 'creditCardForm'}>
            {inputData.map((input) => {
              return (
                <CreditCardInput
                  className="creditCardInput"
                  onChange={this.handleChange}
                  key={input.id}
                  label={input.label}
                  name={input.name}
                  value={cardData[input.name]}
                  placeholder={input.placeholder}
                  autoComplete="off"
                />
              )
            })}
            <button
              className="creditCardForm__submit btnLarge"
              type="submit">Confirm
            </button>
          </form>
          <ThankYouModal
            modal={modalVisible ? 'modal modal__visible' : 'modal'}
            onClick={this.handleModalClose}
            firstName={cardData.cardName.split(' ').shift()}
          />
        </section>
      </main>
    );
  }
}

export default App;