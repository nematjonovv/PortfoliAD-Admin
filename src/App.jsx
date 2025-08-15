import { Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import ContactInfo from "./pages/ContactInfo";
import ClientRequests from "./pages/ClientRequests";
import Sidebar from "./components/sidebar";
import AddNewProject from "./pages/AddNewProject";

function App() {
  return (
      <div className="flex min-h-screen min-w-full h-full w-full overflow-x-hidden bg-[#f8fafc]">
        <Sidebar />
        <Routes>
          <Route path="/add-new-project" element={<AddNewProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact-info" element={<ContactInfo />} />
          <Route path="/clients-request" element={<ClientRequests />} />
        </Routes>
      </div>
  );
}

export default App;
