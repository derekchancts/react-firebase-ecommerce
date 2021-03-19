import './styles.scss';

// children - will allow up to pass like text or span. Can pass them as Children
const Button = ({children, ...otherProps}) => {
  return (
    <button className='btn' {...otherProps}>
      {children}
    </button>
  ); 
};

export default Button;
