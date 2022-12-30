import React, {useState} from 'react';
import {FaUser} from "react-icons/fa";
import {useMutation} from "@apollo/client";
import {ADD_CLIENT} from "../mutations/client-mutations";
import {GET_CLIENTS} from "../queries/client-queries";

const AddClientModal = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        // Обновляем кеш
        update(cache, { data: { addClient } }) {
            const {clients} = cache.readQuery({query: GET_CLIENTS})
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            })
        }
    })

    const onSubmit = (event) => {
        event.preventDefault()

        if(!name || !email || !phone) {
            return alert('Please fill in all fields!')
        }

        addClient(name, email, phone)

        setName('')
        setEmail('')
        setPhone('')
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#addClientModal"
            >
                <span className="d-flex align-items-center">
                    <FaUser className={"icon"}/>
                    <div>Add Client</div>
                </span>
            </button>

            <div
                className="modal fade"
                id="addClientModal"
                aria-labelledby="addClientModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
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
                                    <label className={"form-label"}>Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={"email"}
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className={"form-label"}>Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={"phone"}
                                        value={phone}
                                        onChange={event => setPhone(event.target.value)}
                                    />
                                </div>

                                <button type={"submit"} data-bs-dismiss={"modal"} className={"btn btn-secondary"}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddClientModal;