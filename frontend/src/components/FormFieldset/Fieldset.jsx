import PropTypes from "prop-types";
import "../SignInForm/signInForm.scss";

function Fieldset({ type, label, placeholder, value, setValue }) {
  return (
    <fieldset className="form__fieldset">
      <label htmlFor={label} className="form__label">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="form__input"
      />
    </fieldset>
  );
}

Fieldset.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Fieldset;
