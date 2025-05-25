import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type TablePaginationProps = {
  tableRowsCount: number;
  itemsPerPage: number;
  currentPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onChangePage: (selectedPage: number) => void;
};

function TablePagination({
  tableRowsCount,
  itemsPerPage,
  currentPage,
  onNextPage,
  onPrevPage,
  onChangePage,
}: TablePaginationProps) {
  return (
    <Pagination.Root
      margin="auto"
      marginBottom="20px"
      marginTop="20px"
      height="auto"
      count={tableRowsCount}
      pageSize={itemsPerPage}
      page={currentPage}
    >
      <ButtonGroup variant="ghost" size="sm" wrap="wrap">
        <Pagination.PrevTrigger asChild>
          <IconButton onClick={onPrevPage}>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={page => (
            <IconButton
              variant={{ base: "ghost", _selected: "outline" }}
              onClick={() => {
                onChangePage(page.value);
              }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton onClick={onNextPage}>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}

export default TablePagination;
