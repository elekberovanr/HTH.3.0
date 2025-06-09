import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../layout/Layout'
import Home from '../pages/home/Home'
import Register from '../pages/register/Register'
import Add from '../pages/add/Add'
import Login from '../pages/login/Login'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/add' element={<Add/>}></Route>
                
                </Route>
            </Routes>

        </BrowserRouter >
    )
}

export default Router