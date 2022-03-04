import { render, screen } from '@testing-library/react'
import Alert from '../Alert'
import styles from '../Alert.module.css'


describe("Alert", () => {
    it("should render an alert component", async() => {
        render(<Alert alertText="Alert component" />)
        const alertElement = screen.getByText(/Alert component/i)
        expect(alertElement).toBeInTheDocument()
    })

    it("should render an alert component with success alert class", async() => {
        render(<Alert alertType={`${styles['alert-box']} ${styles['alert-box--success']}`} alertText="Alert component" />)
        const alertElement = screen.getByText(/Alert component/i)
        expect(alertElement).toHaveClass('alert-box', 'alert-box--success')
    })

    it("should render an alert component with danger alert class", async() => {
        render(<Alert alertType={`${styles['alert-box']} ${styles['alert-box--danger']}`} alertText="Alert component" />)
        const alertElement = screen.getByText(/Alert component/i)
        expect(alertElement).toHaveClass('alert-box', 'alert-box--danger')
    })
})