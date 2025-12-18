import './Button.css';

const Button = ({ children, variant = 'primary', size = 'medium', disabled, ...props }) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;