import Logout from "./Logout";

test("renders log out button", () => {
  render(<Logout />);
  const buttonElement = screen.getByText("Logout");
  expect(buttonElement).toBeInTheDocument();
});