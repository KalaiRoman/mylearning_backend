import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';
function Routing() {


    return (
        <>
            <Routes>
                <Route exact path="/" element={<Signin />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </>
    )
}

export default Routing