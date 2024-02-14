import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import Signin from '../components/auth/Signin';
function Routing() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Signin />}></Route>
            </Routes>
        </>
    )
}

export default Routing