import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const [tempItemsPerPage, setTempItemsPerPage] = useState(itemsPerPage);

  if (totalPages <= 1) return null; // Hide pagination if only one page

  const handleItemsPerPageSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const value = Math.min(Math.max(tempItemsPerPage, 1), 10);
      onItemsPerPageChange(value);
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <div className="items-per-page">
        <label>Items per page:</label>
        <input
          type="number"
          value={tempItemsPerPage}
          onChange={(e) => setTempItemsPerPage(Number(e.target.value))}
          onKeyDown={handleItemsPerPageSubmit}
          min="1"
          max="10"
        />
      </div>
    </div>
  );
};

export default Pagination;
