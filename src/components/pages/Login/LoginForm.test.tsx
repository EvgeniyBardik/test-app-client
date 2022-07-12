import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm, { ILoginFormProps } from "./LoginForm";
import IFormValues from "./interface/form.interface";

const submitHandler = jest.fn((values: IFormValues) => Promise.resolve());

function renderLoginForm(props: Partial<ILoginFormProps> = {}) {
  const defaultProps: ILoginFormProps = {
    submitHandler,
  };
  return render(<LoginForm {...defaultProps} {...props} />);
}

describe("<LoginForm />", () => {
  test("should show a warning when the submit button is clicked if the email is entered incorrectly", async () => {
    renderLoginForm();
    const values: IFormValues = {
      email: "wferfergg",
      password: "12345678",
    };

    for (const key in values) {
      const input = screen.getByLabelText(key, {
        exact: false,
        selector: "input",
      });
      fireEvent.change(input, {
        target: { value: values[key as keyof IFormValues] },
      });
    }
    const button = screen.getByTestId("submitButton");
    fireEvent.click(button);
    const emailWarning = await screen.findByText(/enter a valid email/i);
    expect(emailWarning).toBeInTheDocument();
  });
  test("should show a warning when the submit button is clicked if a short password is entered", async () => {
    renderLoginForm();
    const values: IFormValues = {
      email: "groove@email.com",
      password: "123",
    };

    for (const key in values) {
      const input = screen.getByLabelText(key, {
        exact: false,
        selector: "input",
      });
      fireEvent.change(input, {
        target: { value: values[key as keyof IFormValues] },
      });
    }
    const button = screen.getByTestId("submitButton");
    fireEvent.click(button);
    const passwordWarning = await screen.findByText(
      /password must contain at least 6 characters/i
    );
    expect(passwordWarning).toBeInTheDocument();
  });
  test("should show a warning when the submit button is clicked if the email field is empty", async () => {
    renderLoginForm();
    const values: IFormValues = {
      email: "",
      password: "12345678",
    };

    for (const key in values) {
      const input = screen.getByLabelText(key, {
        exact: false,
        selector: "input",
      });
      fireEvent.change(input, {
        target: { value: values[key as keyof IFormValues] },
      });
    }
    const button = screen.getByTestId("submitButton");
    fireEvent.click(button);
    const emailWarning = await screen.findByText(/email is required/i);
    expect(emailWarning).toBeInTheDocument();
  });
  test("should show a warning when the submit button is clicked if the password field is empty", async () => {
    renderLoginForm();
    const values: IFormValues = {
      email: "groove84@gmail.com",
      password: "",
    };

    for (const key in values) {
      const input = screen.getByLabelText(key, {
        exact: false,
        selector: "input",
      });
      fireEvent.change(input, {
        target: { value: values[key as keyof IFormValues] },
      });
    }
    const button = screen.getByTestId("submitButton");
    fireEvent.click(button);
    const emailWarning = await screen.findByText(/enter your password/i);
    expect(emailWarning).toBeInTheDocument();
  });
});
