import styles from './Button.module.css'


const Button = ({ buttonSize, buttonText, onClick }) => {
    return (
        <button className={`${styles['button']} ${buttonSize}`} onClick={onClick}>{buttonText}</button>
    )
}

export default Button