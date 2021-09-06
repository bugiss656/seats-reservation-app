import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from './Navbar.module.css'


const Navbar = () => {
    return (
        <nav className="navbar fixed-top navbar-light bg-light">
            <div className="container-fluid justify-content-center">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className={`${styles.navbarIcon} bi bi-card-checklist`}></i>
                    <span className={styles.navbarText}>Seats Reservation App</span>  
                </Link>
            </div>
        </nav>
    )
}

export default Navbar