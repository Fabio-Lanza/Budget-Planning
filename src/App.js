import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Company from "./components/pages/company/Company";
import EditProject from "./components/pages/edit/EditProject";
import NewProject from "./components/pages/newProject/NewProject";
import Footer from "./components/layout/footer/Footer";
import Container from "./components/layout/container/Container";
import Navbar from "./components/layout/navbar/Navbar";
import Projects from "./components/pages/projects/Projects";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/project/:id" element={<EditProject />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
