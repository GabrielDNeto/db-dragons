import { render, screen } from "@testing-library/react";
import RowSkeleton from "./";

describe("<RowSkeleton />", () => {
  test("renders the skeleton with expected structure", () => {
    render(<RowSkeleton />);

    const skeleton = screen.getByTestId("row-skeleton");
    expect(skeleton).toBeInTheDocument();

    // Validate structure
    const skeletonImg = skeleton.querySelector('[class*="skeletonImg"]');
    const skeletonTexts = skeleton.querySelectorAll('[class*="skeletonText"]');
    const skeletonAction = skeleton.querySelector('[class*="skeletonAction"]');

    expect(skeletonImg).toBeInTheDocument();
    expect(skeletonTexts.length).toBe(3); // 3 skeletonText divs
    expect(skeletonAction).toBeInTheDocument();
  });
});
