import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_PROJECTS} from "../queries/project-queries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

const Projects = () => {
    const {loading, error, data} = useQuery(GET_PROJECTS)

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return (
            <div className="alert alert-warning" role="alert">
                Some error occurred: <b>{error.message}</b>
            </div>
        )
    }

    return (
        <>
            {data.projects.length > 0
                ? (<div className={"row mt-4"}>
                    { data.projects.map(project => <ProjectCard key={project.id} project={project}/>)}
                </div>)
                : (<p>No projects yet</p>)
            }
        </>
    );
};

export default Projects;