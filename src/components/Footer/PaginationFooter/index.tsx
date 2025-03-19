import { useState } from "react";
import { DefaultButton } from "../../Buttons/DefaultButton";
import "./style.css";
interface PaginationFooterProps {
  previousPage: number | undefined | null;
  nextPage: number | undefined | null;
  fetch: (
    page: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}
export const PaginationFooter = ({
  previousPage,
  nextPage,
  fetch,
}: PaginationFooterProps) => {
  const [, setLoading] = useState(false);
  const currentPage = previousPage == null ? 1 : previousPage + 1;
  const goToPreviousPage = () => {
    if (previousPage != null) {
      handlePageChange(previousPage);
    }
  };
  const goToNextPage = () => {
    if (nextPage != null) {
      handlePageChange(nextPage);
    }
  };

  const handlePageChange = async (page: number) => {
    setLoading(true);
    try {
      await fetch(page, setLoading);
    } catch (error) {
      console.error("Error loading page", error);
    }
    setLoading(false);
  };
  return (
    <>
      <div
        // id="navegation"
        className="flex justify-between items-center"
      >
        <DefaultButton
          type="button"
          text="<"
          variant="outlinebrand1"
          size="small"
          className="border-gray-400 text-gray-500 hover:border-brand-1 max-w-[50px] font-semibold"
          onClick={goToPreviousPage}
          disabled={previousPage == null}
        />
        <DefaultButton
          type="button"
          text={currentPage.toString()}
          variant="brand1"
          size="small"
          disabled={true}
          className="border-gray-400 text-gray-500 hover:border-brand-1 w-[40px] h-[40px] font-semibold"
        />
        <DefaultButton
          type="button"
          text=">"
          variant="outlinebrand1"
          size="small"
          className="border-gray-400 text-gray-500 hover:border-brand-1 max-w-[50px] font-semibold"
          onClick={goToNextPage}
          disabled={nextPage == null}
        />
      </div>
    </>
  );
};
