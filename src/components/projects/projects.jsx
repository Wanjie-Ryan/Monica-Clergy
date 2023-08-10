import React, { useState, useEffect } from "react";
import "./projects.css";
import { BsSearch, BsPencil } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import { Link } from "react-router-dom";
import churchview from "../../Assets/homeImages/church_view.jpg";
import { RiDeleteBin7Fill } from "react-icons/ri";
import CreateProjectModal from "../projects/createProject-Modal/createproject";
import UpdateProjectModal from "../projects/updateProject-Modal/updateProject";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // cbjdbjsdsd

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [updateprojectId, setupdateprojectId] = useState(null);
  const [updateModalOpen, setupdateModalOpen] = useState(false);

  const UpdateopenModal = (projectId) => {
    setupdateprojectId(projectId);
    setupdateModalOpen(true);
  };

  const UpdatecloseModal = () => {
    setupdateModalOpen(false);
  };

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      if (
        !Cookies.get().clergyToken ||
        Cookies.get().clergyToken === undefined
      ) {
        navigate("/login");
      } else {
        const token = Cookies.get().clergyToken;

        const res = await axios({
          method: "get",
          url: "https://monica-server.onrender.com/api/clergy/auth/verify",
          headers: { Authorization: "Bearer " + token },
          data: {},
        });

        if (res.data.type !== "success") {
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const FetchedProjects = await axios.get(
          "https://monica-server.onrender.com/api/clergy/projects/getAllprojects"
        );

        // console.log(FetchedProjects.data.AllProjects)

        const AllprojectsFetched = FetchedProjects.data.AllProjects;

        setProjects(AllprojectsFetched);

        setLoading(false);
      } catch (err) {
        // console.log(err)

        setErrmsg(
          "There was an error while fetching the data, refresh the page and try again"
        );
        setLoading(false)
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    setLoading(true);

    try {
      const Deletetoken = Cookies.get().clergyToken;

      const deleteProject = await axios.delete(
        `https://monica-server.onrender.com/clergy/projects/deleteproject/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${Deletetoken}`,
          },
        }
      );

      toast.success("Project was deleted successfully");

      setLoading(false);
    } catch (err) {
      // console.log(err)
      setErrmsg("Sorry could not be able to delete your project");
      setLoading(false);
    }
  };

  const [searchText, setSearchText] = useState();
  const [searchErr, setsearchErr] = useState();
  const [searchProjects, setSearchProjects] = useState([]);
  const [searchMsg, setSearchMsg] = useState();

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const Search = async () => {
    setLoading(true);
    try {
      const Searchtoken = Cookies.get().clergyToken;

      const searchProject = await axios.get(
        `https://monica-server.onrender.com/api/clergy/projects/searchproject?searchTerm=${searchText}`,
        { headers: { Authorization: `Bearer ${Searchtoken}` } }
      );

      // console.log(searchProject.data)

      setSearchProjects(searchProject.data.foundProjects);
      setSearchMsg(searchProject.data.msg);

      setLoading(false);
    } catch (err) {
      // console.log(err)

      setsearchErr("There project you are searching for does not exist");

      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      Search();
    }
  };

  return (
    <>
      <section className="projects">
        <div className="projects-container">
          <div className="search-add">
            <div className="search">
              <input
                type="text"
                placeholder="search by name of project"
                value={searchText}
                onChange={handleSearchText}
                onKeyDown={handleKeyDown}
              />

              <BsSearch className="search-icon" onClick={Search} />
            </div>

            <div className="add" onClick={openModal}>
              <p className="add-p">Create Project</p>
              <BiAddToQueue className="add-icon" />
            </div>
          </div>

          {loading ? (
            <AiOutlineLoading3Quarters className="loading-icon" />
          ) : (
            <>
              {searchProjects.length > 0 ? (
                <div className="actual-projects">
                  {searchProjects.map((projectsearch, index) => (
                    <>
                      <p className="project-desc">{searchMsg}</p>
                      <div className="project-img" key={index}>
                        <img src={projectsearch.image} className="img-proj" />

                        <div className="img-text">
                          <p className="project-desc">{projectsearch.title}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                ""
              )}
            </>
          )}

          {searchErr && <p className="error-msg">{searchErr}</p>}

          <div className="actual-projects">
            {loading ? (
              <AiOutlineLoading3Quarters className="loading-icon" />
            ) : projects.length === 0 ? (
              <p>No projects Have been found</p>
            ) : (
              projects.map((project, index) => (
                <div className="project-img" key={index}>
                  <img src={project.image} alt="church" className="img-proj" />

                  <div className="img-text">
                    <p className="project-desc">{project.title}</p>
                  </div>

                  <div className="up-del">
                    <BsPencil
                      className="up-icon"
                      title="update"
                      onClick={() => UpdateopenModal(project._id)}
                    />
                    <RiDeleteBin7Fill
                      className="del"
                      title="delete"
                      onClick={() => handleDelete(project._id)}
                    />
                  </div>

                  {/* <p>{projects.description}</p> */}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        token={Cookies.get().clergyToken}
      />
      <UpdateProjectModal
        isOpen={updateModalOpen}
        onClose={UpdatecloseModal}
        projectId={updateprojectId}
        token={Cookies.get().clergyToken}
      />
    </>
  );
}

export default Projects;
