import { render, screen } from "@testing-library/react"
import ListItem from "../ListItem"


describe("ListItem", () => {
    it("should render ListItem component with provided text", async() => {
        render(<ListItem text="ListItem component" />)
        const listItemElement = screen.getByText(/ListItem component/i)
        expect(listItemElement).toBeInTheDocument()
    })
})