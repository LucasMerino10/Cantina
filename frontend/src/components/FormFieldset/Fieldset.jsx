import PropTypes from "prop-types";
import "../SignInForm/signInForm.scss";

function Fieldset({ label, placeholder }) {
  return (
    <fieldset className="form__fieldset">
      <label htmlFor={label} className="form__label">
        {label}
      </label>
      <input type="text" placeholder={placeholder} className="form__input" />
    </fieldset>
  );
}

Fieldset.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Fieldset;
