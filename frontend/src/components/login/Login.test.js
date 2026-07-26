import Login from "./Login";

test("renders log in button", () => {
  render(<Login />);
  const buttonElement = screen.getByText("Login");
  expect(buttonElement).toBeInTheDocument();
});