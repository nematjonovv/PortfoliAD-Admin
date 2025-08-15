import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import CategoryDropdown from "../components/CategoryDropdown";
import ErrNotification from "../components/ErrNotification";
import SuccessNotification from "../components/SuccessNotification";

function AddNewProject() {
  const [formData, setFormData] = useState({
    title_uz: "",
    title_en: "",
    client: "",
    category_id: "",
    techStack: "",
    desc_uz: "",
    desc_en: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isTrue, setIsTrue] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [message, setMessage] = useState("");
  const [errNotification, setErrNotification] = useState("");
  // create/add project
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsTrue(true);
    try {
      // 1) Project yaratish
      const createRes = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const createResJson = await createRes.json();

      if (createResJson.error === "SequelizeValidationError") {
        throw createResJson;
      }

      const { id: projectId } = await createResJson;
      console.log(typeof projectId);
      console.log(createResJson);

      // 2) Image upload
      const fd = new FormData();
      if (files?.image1) fd.append("image1", files.image1);
      if (files?.image2) fd.append("image2", files.image2);
      if (files?.image3) fd.append("image3", files.image3);

      const upRes = await fetch(
        `http://localhost:8080/api/projectImages/${projectId}`,
        {
          method: "POST",
          body: fd,
        }
      );

      if (!upRes.ok) {
        const msg = await upRes.json();
        throw new Error(
          `Image upload failed: ${upRes.status} ${msg.error || ""}`
        );
      }
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      if (err.error === "SequelizeValidationError") {
        setErrNotification(err.message);
        setIsErr(true);
        setTimeout(() => setIsErr(false), 3000);
        console.log(err.error);
      }
    } finally {
      setIsTrue(false);
      setMessage("Loyiha portfelga qo'shildi");

      if (!isTrue) {
        setIsTrue(false);
      }
    }

    setFiles({
      image1: null,
      image2: null,
      image3: null,
    });

    setFormData({
      title_uz: "",
      title_en: "",
      client: "",
      category_id: "",
      techStack: "",
      desc_uz: "",
      desc_en: "",
    });
  };

  // get CategoryID from "../components/CategoryDropdown"
  const handleCategoryChange = (newId) => {
    setFormData((prev) => ({ ...prev, category_id: newId }));
  };
  // Upload Image
  const [files, setFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
  });
  const handleFile = (key, file) =>
    setFiles((prev) => ({ ...prev, [key]: file }));

  return (
    <div className="px-7 py-5 w-full mb-5 container ">
      <SuccessNotification isSuccess={isSuccess} message={message} />
      <ErrNotification isErr={isErr} message={errNotification} />
      {isTrue ? (
        <div class="h-full flex items-center justify-center">
          <div class="w-8 h-8 border-4 border-[#db9f7e] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl relative">
          <div className="flex justify-between items-center">
            <div>
              <h5 className="capitalize text-[24px] text-black font-semibold">
                add new project
              </h5>
              <p className="text-sm text-gray-500">
                Create a new portfolio project entry.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="absolute top-2 right-0 capitalize text-md text-[#fff] bg-[#febd9a] py-1.5 px-5 rounded-sm cursor-pointer outline-none"
            >
              add
            </button>
            <div className=" flex justify-between gap-5">
              {/* text part of the data */}
              <div className="px-5 py-4 border-1 rounded-md border-gray-300 w-[50vw] font-semibold mt-5">
                <div>
                  <h5 className="font-semibold text-[18px] ">
                    Project Details
                  </h5>
                  <p className="text-gray-500 text-[14px]">
                    Fill in titles, client, category, and tech stack.
                  </p>
                </div>
                {/* title */}
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col w-1/2 mr-4">
                    <label htmlFor="title_uz">Title (UZ)</label>
                    <input
                      className="w-full border border-gray-300 py-1 px-2 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                      id="title_uz"
                      name="title_uz"
                      value={formData.title_uz}
                      onChange={handleChange}
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
                      value={formData.title_en}
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g., Futuristic SMD"
                    />
                  </div>
                </div>
                {/* client & category */}
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col w-1/2 mr-4 ">
                    <label htmlFor="client">Client</label>
                    <input
                      className="w-full border border-gray-300 py-1 px-2 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                      id="client"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g., ECO Sun"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="">Category</label>
                    <CategoryDropdown
                      onChange={handleCategoryChange}
                      value={formData.category_id}
                    />
                  </div>
                </div>
                {/* tech stack */}
                <div className="flex flex-col mt-4">
                  <label htmlFor="">Tech Stack</label>
                  <input
                    className="w-full border border-gray-300 py-1 px-2 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                    id="techStack"
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g., Futuristic SMD"
                  />
                </div>
                {/* description */}
                <div className="flex flex-col w-full mt-4">
                  <div className="flex flex-col mr-4 ">
                    <label htmlFor="desc_uz">Description (UZ)</label>
                    <textarea
                      name="desc_uz"
                      id="desc_uz"
                      onChange={handleChange}
                      value={formData.desc_uz}
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
                      onChange={handleChange}
                      value={formData.desc_en}
                      className="w-full h-30 resize-y rounded-md border border-gray-300 px-3 py-2
             placeholder:text-gray-400
             focus:outline-none focus:ring-2 focus:ring-gray-500"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* adding image */}

              <div className="px-5 py-4 border-1 rounded-md flex-1 border-gray-300 font-semibold mt-5">
                <div>
                  <h5 className="font-semibold text-xl">Images </h5>
                  <p className="text-gray-500 text-sm">
                    Upload 3 separate images{" "}
                  </p>
                </div>
                <div className="flex flex-col gap-7 mt-5">
                  <ImageUpload
                    label={"Image 1"}
                    name={"image1"}
                    file={files.image1}
                    onChange={handleFile}
                  />
                  <ImageUpload
                    label={"Image 2"}
                    name={"image2"}
                    file={files.image2}
                    onChange={handleFile}
                  />
                  <ImageUpload
                    label={"Image 3"}
                    name={"image3"}
                    file={files.image3}
                    onChange={handleFile}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddNewProject;
