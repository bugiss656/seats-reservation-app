import { render, screen } from '@testing-library/react'
import Alert from '../Alert'
import alertStyles from '../Alert.module.css'


describe("Alert", () => {
    it("should render an alert component", async() => {
        render(<Alert text="Alert component" />)
        const alertElement = screen.getByText(/Alert component/i)
        expect(alertElement).toBeInTheDocument()
    })

    it("should render an alert component with success alert class", async() => {
        render(<Alert type={`${alertStyles.alertBox} ${alertStyles.alertBoxSuccess}`} text="Alert component" />)
        const alertElement = screen.getByText(/Alert component/i)
        expect(alertElement).toHaveClass('alertBox', 'alertBoxSuccess')
    })

    it("should render an alert component with danger alert class", async() => {
        render(<Alert type={`${alertStyles.alertBox} ${alertStyles.alertBoxDanger}`} text="Alert component" />)
        const alertElement = screen.getByText(/Alert component/i)
        expect(alertElement).toHaveClass('alertBox', 'alertBoxDanger')
    })
})