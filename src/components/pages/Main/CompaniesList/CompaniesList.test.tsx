import { render, screen } from "@testing-library/react";
import { CompaniesList } from "./CompaniesList";
import * as reduxHooks from "react-redux";
import "@testing-library/jest-dom";
import { IEnhancedTable } from "./interfaces/company-list.interfaces";
import { MemoryRouter, Routes, Route } from "react-router-dom";

jest.mock("react-redux");

const user = {
  id: 3,
  email: "ef@email.com",
  password: "123456",
  phoneNumber: "+380956765544",
  nickName: "nick",
  description: "some description",
  position: "general",
  firstName: "Ludwich",
  lastName: "Van",
  role: "USER",
};

const props: IEnhancedTable = {
  setOrder: jest.fn(),
  setOrderBy: jest.fn(),
  order: "asc",
  orderBy: "name",
  companies: [
    {
      id: 4,
      name: "Apple",
      address: "Kyiv",
      serviceOfActivity: "Some",
      numberOfEmployees: 454,
      type: "type",
      description: "dddd",
      userId: 3,
      ownerEmail: "owner@email.com",
    },
  ],
};

describe("CompaniesList", () => {
  test("Companies List displayed correctly for User with role ADMIN", async () => {
    const admin = { ...user, role: "ADMIN" };
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue(admin);

    render(
      <MemoryRouter initialEntries={["/main"]}>
        <Routes>
          <Route path="/main" element={<CompaniesList {...props} />} />
        </Routes>
      </MemoryRouter>
    );
    const apple = await screen.findByText(/apple/i);
    const ownerEmail = await screen.findByText(/owner@email.com/i);
    expect(apple).toBeInTheDocument();
    expect(ownerEmail).toBeInTheDocument();
  });
  test("Companies List displayed correctly for User with role USER", async () => {
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue(user);

    render(
      <MemoryRouter initialEntries={["/main"]}>
        <Routes>
          <Route path="/main" element={<CompaniesList {...props} />} />
        </Routes>
      </MemoryRouter>
    );
    const apple = await screen.findByText(/apple/i);
    const ownerEmail = screen.queryByText(/owner@email.com/i);
    expect(apple).toBeInTheDocument();
    expect(ownerEmail).not.toBeInTheDocument();
  });
});
