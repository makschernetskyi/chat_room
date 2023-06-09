import styles from './App.module.sass'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {ErrorPage} from "../ErrorPage";
import {Login} from "../Login";
import {Register} from "../Register";
import {useEffect, useState} from "react";
import {PrivateRoutes} from "../PrivateRoutes";
import {useDispatch, useSelector} from "../../hooks.ts";
import {checkAuth, clearState} from "../../redux/slices/globalSlice.ts";
import {LoadingScreen} from "../LoadingScreen";
import {ChatPage} from "../ChatPage";
import {HomePage} from "../HomePage";







export const App = () => {

    const {isAuth, loading} = useSelector(state=>state.global)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth())
        return () =>{
            dispatch(clearState({}))
        }
    }, []);

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <>
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes auth={isAuth}/>}>
                        <Route path="/chat" element ={
                            <ChatPage/>
                        }/>
                        <Route path="/" element ={
                            <HomePage/>
                        }/>
                    </Route>
                    <Route path="/login" element={!isAuth ? <Login/> : <Navigate to="/chat" replace />}/>
                    <Route path="/register" element={!isAuth ?<Register/> : <Navigate to="/chat" replace />}/>
                    <Route path="/NotFound" element={<ErrorPage/>}/>

                    <Route path="/" element={<Navigate to="/chat" replace/>}/>
                    <Route path="*" element={<Navigate to="/NotFound" replace/>}/>
                </Routes>
            </Router>
        </>
    )
}

