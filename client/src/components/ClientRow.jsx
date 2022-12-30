import React from 'react';
import {FaTrash} from "react-icons/fa";
import {useMutation} from "@apollo/client";
import {DELETE_CLIENT} from "../mutations/client-mutations";
import {GET_CLIENTS} from "../queries/client-queries";

const ClientRow = ({client}) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        // Обновляем данные на странице после удаления,
        // но здесь не подходит, тк при частом вызове может вызвать баги
        // refetchQueries: [{query: GET_CLIENTS}]

        // Обновляем данные на странице после удаления, используя кеш
        update(cache, { data: { deleteClient } }) {
            const {clients} = cache.readQuery({ query: GET_CLIENTS})
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.filter(client => client.id !== deleteClient.id)}
            })
        }
    })

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                    <FaTrash/>
                </button>
            </td>
        </tr>
    );
};

export default ClientRow;