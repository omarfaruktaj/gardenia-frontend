const NoPostsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h18v18H3V3zm9 12l4-4-4-4v8z"
        />
      </svg>
      <h2 className="text-lg font-semibold text-gray-700">No Posts Found</h2>
      <p className="text-gray-500 mt-2">
        It seems we couldn&apos;t find any posts that match your search
        criteria.
      </p>
      <p className="text-gray-500">
        Please try adjusting your filters or searching for something else.
      </p>
    </div>
  );
};

export default NoPostsFound;
