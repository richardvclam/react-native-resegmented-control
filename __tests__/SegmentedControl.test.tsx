import React from "react";
import { render } from "@testing-library/react-native";
import { SegmentedControl } from "../src/SegmentedControl";
import { Segment } from "../src/Segment";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

describe("SegmentedControl", () => {
  it("should render", () => {
    const { getByText } = render(
      <SegmentedControl>
        <Segment name="Test" content="Test" />
      </SegmentedControl>
    );

    expect(getByText("Test")).toBeDefined();
  });
});
