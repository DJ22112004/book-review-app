import React from 'react';

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null; // Don't render pagination if there's only one page

  // Create an array of page numbers to render
  const pageNumbers = [...Array(pages).keys()].map(i => i + 1);

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 border rounded ${
            page === number
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;