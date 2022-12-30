import React from 'react';
import {useQuery} from "@apollo/client";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";
import {GET_CLIENTS} from "../queries/client-queries";

const Clients = () => {
    const {loading, error, data} = useQuery(GET_CLIENTS)

    if (loading) {
        return <Spinner />
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
                <table className={'table table-hover mt-3'}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                    {data.clients.map(client => <ClientRow key={client.id} client={client}/>)}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Clients;