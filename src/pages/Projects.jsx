import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SuccessNotification from "../components/SuccessNotification";
import CategoryDropdown from "../components/CategoryDropdown";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const fetchProjects = () => {
    fetch(`http://localhost:8080/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data));

    fetch(`http://localhost:8080/api/categories`)
      .then((res) => res.json())
      .then((ctgrs) => setCategories(ctgrs));
  }, []);

  const deleteProject = (deleteId) => {
    fetch(`http://localhost:8080/api/projects/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Delete failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log("O‘chirildi:", data);
        setIsSuccess(true);
        setMessage(data.message);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
        fetchProjects();
      })

      .catch((error) => {
        console.error("Xatolik:", error);
      });
  };

  return (
    <div className="flex-1 bg-white text-[#0f172a]">
      {/* Edit modal */}
      {/* <div className="fixed top-0 left-0 bg-[#00000076] w-screen h-screen flex justify-center items-center">
        <div className="px-5 py-4 border-1 rounded-md border-gray-300 w-[50vw] font-semibold mt-5 bg-gray-100">
          <div>
            <h5 className="font-semibold text-[18px] ">Project Details</h5>
            <p className="text-gray-500 text-[14px]">
              Fill in titles, client, category, and tech stack.
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex flex-col w-1/2 mr-4">
              <label htmlFor="title_uz">Title (UZ)</label>
              <input
                className="w-full border border-gray-300 py-1 px-2 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                id="title_uz"
                name="title_uz"
                type="text"
                placeholder="e.g., Futuristik SMD"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="title_en">Title (EN)</label>
              <input
                className="w-full border border-gray-300 py-1 px-2 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                id="title_en"
                name="title_en"
                type="text"
                placeholder="e.g., Futuristic SMD"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex flex-col w-1/2 mr-4 ">
              <label htmlFor="client">Client</label>
              <input
                className="w-full border border-gray-300 py-1 px-2 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                id="client"
                name="client"
                type="text"
                placeholder="e.g., ECO Sun"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="">Category</label>
              <CategoryDropdown />
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="">Tech Stack</label>
            <input
              className="w-full border border-gray-300 py-1 px-2 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-gray-400"
              id="techStack"
              name="techStack"
              type="text"
              placeholder="e.g., Futuristic SMD"
            />
          </div>
          <div className="flex flex-col w-full mt-4">
            <div className="flex flex-col mr-4 ">
              <label htmlFor="desc_uz">Description (UZ)</label>
              <textarea
                name="desc_uz"
                id="desc_uz"
                className="w-full h-30 resize-y rounded-md border border-gray-300 px-3 py-2
             placeholder:text-gray-400
             focus:outline-none focus:ring-2 focus:ring-gray-500"
              ></textarea>
            </div>
            <div className="flex flex-col mr-4 ">
              <label htmlFor="desc_en">Description (EN)</label>
              <textarea
                name="desc_en"
                id="desc_en"
                className="w-full h-30 resize-y rounded-md border border-gray-300 px-3 py-2
             placeholder:text-gray-400
             focus:outline-none focus:ring-2 focus:ring-gray-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div> */}
      {/* delete modal */}
      
      <div className="mx-auto max-w-6xl px-6 py-10">
        <SuccessNotification isSuccess={isSuccess} message={message} />
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Project List
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your portfolio projects.
            </p>
          </div>
          <Link
            to={"/add-new-project"}
            className="inline-flex items-center gap-2 rounded-lg bg-[#febd9a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.75v5.75a.75.75 0 0 1-1.5 0V12.5H5.5a.75.75 0 0 1 0-1.5h5.75V5.25A.75.75 0 0 1 12 4.5Z" />
            </svg>
            Add New
          </Link>
        </div>

        {/* Table wrapper */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="">
                <th className="px-6  py-4 text-left text-sm font-semibold text-slate-600">
                  Title (Uz)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Tech Stack
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Images
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white capitalize">
              {/* Row 1 */}
              {projects?.map((project, index) => (
                
                <>
<div
        className={`fixed left-0 top-0 bg-[#0000001f] h-screen w-screen flex justify-center items-center ${
          deleteModal ? "" : "hidden"
        } `}
      >
        <div className="bg-gray-100 w-xs h-25 rounded-md flex justify-around items-center">
          <button onClick={() => setDeleteModal(false)} className="border-1 border-gray-400 px-8 py-3 rounded-2xl cursor-pointer">
            Cancel
          </button>
          <button onClick={() => deleteProject(project.id)} className="border-1 border-transparent px-8 py-3 rounded-2xl bg-red-500 text-white cursor-pointer">
            Delete
          </button>
        </div>
      </div>
                <tr key={index}>
                  <td className="px-6 py-4 align-middle text-sm text-slate-800">
                    {project.title_uz}
                  </td>
                  <td className="px-6 py-4 align-middle text-sm text-slate-800">
                    {project.client}
                  </td>
                  <td className="px-6 py-4 align-middle text-sm text-slate-800">
                    {categories?.map((ctgr) =>
                      ctgr.id === project.category_id
                        ? ctgr.category
                        : undefined
                    )}
                  </td>
                  <td className="px-6 py-4 align-middle text-sm text-slate-800">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle text-sm text-slate-800">
                    <div className="flex items-center gap-2">
                      {project.images?.map((img) =>
                        [1, 2, 3].map((num) => (
                          <img
                            key={num}
                            src={img[`image${num}`]}
                            alt=""
                            className="h-10 w-10 rounded-md object-cover ring-1 ring-slate-200"
                          />
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle text-sm text-slate-800">
                    <div className="flex items-center gap-3">
                      <button
                        // onClick={() => handleModal()}
                        className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteModal(true)}
                        className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-200 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Projects;
