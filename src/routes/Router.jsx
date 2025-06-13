import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../layout/Layout'
import Home from '../pages/home/Home'
import Register from '../pages/register/Register'
import Login from '../pages/login/Login'
import AddProduct from '../pages/add/AddProduct'
import Profile from '../pages/profile/Profile'
import ProfileEdit from '../pages/profile/profileEdit/ProfileEdit'
import EditProduct from '../pages/profile/editProduct/EditProduct'
import ChatPage from '../pages/chat/ChatPage'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/add' element={<AddProduct/>}></Route>
                    <Route path='/profile' element={<Profile/>}></Route>
                    <Route path='/profile/edit' element={<ProfileEdit/>}></Route>
                    <Route path="/edit-product/:id" element={<EditProduct />} />
                    <Route path='/chat' element={<ChatPage/>}></Route>

                
                </Route>
            </Routes>

        </BrowserRouter >
    )
}

export default Router