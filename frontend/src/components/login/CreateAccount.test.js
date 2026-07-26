import CreateAccount from "./CreateAccount";

test("renders create account button", () => {
  render(<CreateAccount />);
  const buttonElement = screen.getByText("Create Account");
  expect(buttonElement).toBeInTheDocument();
});