import PropTypes from "prop-types";
import "../SignInForm/signInForm.scss";

function Fieldset({ type, label, placeholder, value, setValue, handleSubmit }) {
  return (
    <fieldset className="form__fieldset">
      <label htmlFor={label} className="form__label">
        {label}
      </label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
  handleSubmit: PropTypes.func,
};

Fieldset.defaultProps = {
  handleSubmit: null,
};

export default Fieldset;
