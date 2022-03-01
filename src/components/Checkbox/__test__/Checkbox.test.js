import { render, screen } from "@testing-library/react";
import Checkbox from "../Checkbox";

describe("Checkbox", () => {
    it("should render a checkbox component with provided label text", async() => {
        render(<Checkbox label="Checkbox label" />)
        const checkboxElement = screen.getByLabelText(/Checkbox label/i)
        expect(checkboxElement).toBeInTheDocument()
    })

    it("should render an enabled and unchecked checkbox component", async() => {
        render(<Checkbox label="Checkbox label" value={false} onChange={() => {}} disabled={false} />)
        const checkboxElement = screen.getByLabelText(/Checkbox label/i)
        expect(checkboxElement).toBeInTheDocument()
        expect(checkboxElement).toBeEnabled()
        expect(checkboxElement).not.toBeChecked()
    })

    it("should render an disabled and checked checkbox component", async() => {
        render(<Checkbox label="Checkbox label" value={true} onChange={() => {}} disabled={true} />)
        const checkboxElement = screen.getByLabelText(/Checkbox label/i)
        expect(checkboxElement).toBeInTheDocument()
        expect(checkboxElement).toBeDisabled()
        expect(checkboxElement).toBeChecked()
    })
})