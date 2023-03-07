import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(42);
   });

  it("does something else it is supposed to do", () => {
    // ...
  });
});