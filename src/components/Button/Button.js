import styles from './Button.module.css'


const Button = ({ size, text, onClick }) => {
    return (
        <button className={`${styles['button']} ${size}`} onClick={onClick}>{text}</button>
    )
}

export default Button