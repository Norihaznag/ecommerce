import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Pagination = ({ pagination  }) => {
  const { page, pageCount } = pagination;
  const router = useRouter();

  function onPageChange(page) {
    router.push(`?page=${page}`)
  }

  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-gray-700">
        Page {page} of {pageCount}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
