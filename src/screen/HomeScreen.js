
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProjects, fetchSubProjects } from "../action/projects";
import Projects from "../components/projects";
import SubProject from "../components/SubProject";
import DpArea from "../components/DpArea";
import ProjectCard from "../components/ProjectCard";
import { fetchDpAreas } from "../action/projects";
import { useNavigate } from "react-router-dom";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState({id: null,
    name: null,});
  const [selectedSubProject, setSelectedSubProject] = useState({id: null,
    name: null,});
  const [selectedDP, setSelectedDP] = useState({id: null,
    name: null,});
  const handleProjectChange = (id, name) => {
    
    setSelectedSubProject({
      id: null,
      name: null
    })
    setSelectedDP({
      id: null,
      name: null
    })
    setSelectedProject({
      id: id,
      name: name,
    });
    setTab('sub-projects')
  }

  const handleSubProjectChange = (id, name) => {
    setSelectedDP({
      id: null,
      name: null
    })
    
    setSelectedSubProject({
      id: id,
      name: name
    })
    setTab('dp-areas')

    
  }

  const handleDPChange = (id, name) => {
    setSelectedDP({
      id: id,
      name: name
    })

    const data = {
      id: id,
      project: selectedProject.name,
      subProject: selectedSubProject.name,
      dpArea: name
    }
    navigate('/dp-areas', {
      state: {
        data
      },
    });
  } 
  

 

  const projects = useSelector((state) => state?.listProjects);

  return <div className={`flex flex-row py-5 h-[100%] bg-gray-100 ${tab === 'dp-areas' ? 'justify-evenly' : 'gap-[5%] px-[2%]'}`}>
    

    {
      tab != '' && 
      <Projects setSelectedProject={handleProjectChange}/> 
     
    }
    {
       (tab === 'sub-projects' || tab === 'dp-areas') &&
        <SubProject setSelectedSubProject={handleSubProjectChange} selectedProject={selectedProject.id}/>

    }
    {
      tab === "dp-areas" && <DpArea setSelectedDP={handleDPChange} selectedSubProject={selectedSubProject.id}/>
    }

  </div>;
};

export default HomeScreen;