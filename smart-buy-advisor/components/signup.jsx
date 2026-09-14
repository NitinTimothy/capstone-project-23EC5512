import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

        } catch (error) {

        }
    }

    return (
        <div style={{
            width: "350px",
            margin: "50px auto",
            padding: "30px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>

            <h2 style={{ textAlign: "center" }}>Signup</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        boxSizing: "border-box"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "10px",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Signup
                </button>

                <p
                    onClick={() => navigate("/login")}
                    style={{
                        textAlign: "center",
                        cursor: "pointer",
                        marginTop: "15px"
                    }}
                >
                    Already have an account? <b>Login</b>
                </p>

            </form>

        </div>
    )
}
export default Signup