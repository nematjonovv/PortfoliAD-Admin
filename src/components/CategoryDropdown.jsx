import { useEffect, useState } from "react";

function CategoryDropdown({onChange, value}) {
 
  const [categories, setCategories] = useState([])

   useEffect(() => {
      fetch("http://localhost:8080/api/categories")
      .then((req) => req.json())
      .then((data) => setCategories(data))
  }, []);

  

  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-md border border-gray-300 bg-transparent px-2 py-1 text-left text-gray-800 focus:outline-none"
        aria-expanded={open}
      >
        <span className={value ? "" : "text-gray-400"}>
          {value ? categories.find(c => c.id === value)?.category : "Choose category"}
        </span>

        <svg
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500
                      transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
        </svg>
      </button>

      <ul
        className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300
                    bg-[#f8fafc] p-1 shadow-lg origin-top transform transition
                    duration-150 ease-out
                    ${
                      open
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                    }`}
        aria-hidden={!open}
        
      >
        {categories?.map((ctgr) => (
          <li
            key={ctgr.id}
            onClick={() => {
              onChange(ctgr.id)
              setOpen(false);
            }}
            className="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            {ctgr.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryDropdown;
