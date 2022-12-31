import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {UPDATE_PROJECT} from "../mutations/project-mutations";
import {GET_PROJECT} from "../queries/project-queries";

const EditProjectForm = ({project}) => {
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState('')
    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {id: project.id, name, description, status},
        refetchQueries: [{query: GET_PROJECT, variables: {id: project.id} }]
    })

    const onSubmit = (event) => {
        event.preventDefault()

        if(!name || !description || !status) {
            return alert('Please fill in all fields!')
        }

        updateProject(name, description, status)
        alert('Done!')
    }

    return (
        <div className={"mt-5"}>
            <h3>Update Project Details</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className={"form-label"}>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id={"name"}
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className={"form-label"}>Description</label>
                    <textarea
                        className="form-control"
                        id={"description"}
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className={"form-label"}>Status</label>
                    <select id="status" className="form-select" value={status}
                            onChange={event => setStatus(event.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type={"submit"} className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default EditProjectForm;