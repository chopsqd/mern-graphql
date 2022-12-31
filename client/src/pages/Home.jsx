import React from 'react';
import AddClientModal from "../components/AddClientModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";

const Home = () => {
    return (
        <>
            <div className={"d-flex gap-3 mb-4"}>
                <AddClientModal/>
            </div>
            <Projects/>
            <Clients/>
        </>
    );
};

export default Home;