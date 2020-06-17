import React, { useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'
import { ToastContainer } from 'react-toastify'
const Signup = () => {
    return (
        <Layout>
            <ToastContainer />
            <h1>Signup</h1>
        </Layout>
    )
}

export default Signup
