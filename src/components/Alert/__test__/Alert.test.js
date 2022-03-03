import { render, screen } from '@testing-library/react'
import Alert from '../Alert.styled'


describe("Alert", () => {
    it("should render an alert component", async() => {
        render(<Alert alertText="Alert component" />)
        const alertElement = screen.getByText(/Alert component/i)
        expect(alertElement).toBeInTheDocument()
    })

    it("should render an alert component with success alert class", async() => {
        render(<Alert alertType='success' alertText="Alert component" />)
        const alertElement = screen.getByText(/Alert component/i)
        expect(alertElement).toHaveStyle('background-color: #ccffcc')
    })

    it("should render an alert component with danger alert class", async() => {
        render(<Alert alertType='danger' alertText="Alert component" />)
        const alertElement = screen.getByText(/Alert component/i)
        expect(alertElement).toHaveStyle('background-color: #ffe6e6')
    })
})