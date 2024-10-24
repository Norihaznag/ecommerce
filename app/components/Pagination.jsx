export default function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
    const pageNumbers = []
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i)
    }
  
    return (
      <nav className="mt-6">
        <ul className="flex justify-center space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  }