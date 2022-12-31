import React, {useState} from 'react';
import {FaList} from "react-icons/fa";
import {useMutation, useQuery} from "@apollo/client";
import {GET_CLIENTS} from "../queries/client-queries";
import {ADD_PROJECT} from "../mutations/project-mutations";
import {GET_PROJECTS} from "../queries/project-queries";

const AddClientModal = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('new')
    const [clientId, setClientId] = useState('')

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId},
        update(cache, {data: {addProject}}) {
            const {projects} = cache.readQuery({query: GET_PROJECTS})
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            })
        }
    })

    // Get Clients for select
    const {loading, error, data} = useQuery(GET_CLIENTS)

    const onSubmit = (event) => {
        event.preventDefault()

        if (!name || !description || !status || !clientId) {
            return alert('Please fill in all fields!')
        }

        addProject(name, description, status, clientId)

        setName('')
        setDescription('')
        setStatus('new')
        setClientId('')
    }

    if (loading) {
        return null
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
            {!loading && !error && (
                <>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addProjectModal"
                    >
                <span className="d-flex align-items-center">
                    <FaList className={"icon"}/>
                    <div>Add Project</div>
                </span>
                    </button>

                    <div
                        className="modal fade"
                        id="addProjectModal"
                        aria-labelledby="addProjectModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="addProjectModalLabel">New Project</h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
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
                                        <div className="mb-3">
                                            <label className={"form-label"}>Client</label>
                                            <select id="clientId" className="form-select" value={clientId}
                                                    onChange={event => setClientId(event.target.value)}>
                                                <option value="">Select Client</option>
                                                {data.clients.map(client =>
                                                    <option key={client.id} value={client.id}>{client.name}</option>
                                                )}
                                            </select>
                                        </div>

                                        <button type={"submit"} data-bs-dismiss={"modal"}
                                                className={"btn btn-primary"}>Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default AddClientModal;