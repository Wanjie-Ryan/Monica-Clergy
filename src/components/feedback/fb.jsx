import React, {useState, useEffect} from 'react'
import './fb.css'
import {AiFillPrinter} from 'react-icons/ai'
import axios from 'axios'
import Cookies from 'js-cookie'
import {  AiOutlineLoading3Quarters } from "react-icons/ai";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';


function FeedBack (){

    const [fb, setFb] = useState([])
    const [errMsg, setErrMsg] = useState()
    const [Loading, setLoading] = useState(false);

    useEffect(()=>{

        const getFeedbacks = async()=>{

            setLoading(true)

            try{

                const token =Cookies.get().clergyToken

                const Allfeedbacks = await axios.get('http://localhost:3005/api/user/allfeedbacks', {headers:{
                    Authorization:`Bearer ${token}`
                }})

                // console.log(Allfeedbacks.data.getFeedbacks)

                setFb(Allfeedbacks.data.getFeedbacks)

                setLoading(false)


            }

            catch(err){

                // console.log(err)
                setLoading(false)
                setErrMsg('Sorry could not be able to get feedbacks')
            }
        }

        getFeedbacks()


    },[])

    
    return(

        <>

            <section className='projects'>

                <p className='feedback-title'>Feedback from the congregants</p>

                <div className="projects-container">

                    <div className="table-container">

                        <AiFillPrinter className='printer'/>

                        <table className="custom-table">
                            <thead>

                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                </tr>

                            </thead>


                            {Loading ? (

                                <AiOutlineLoading3Quarters className="loading-icon" />

                                ) : fb.length === 0 ? (

                                <tr>

                                    <td colSpan="4">No feedbacks available</td>

                                </tr>

                                ) : (

                                fb.map((feedback, index) => (

                                    <tr key={feedback.id}>

                                    <td>{index + 1}</td>
                                    <td>{feedback.name}</td>
                                    <td>{feedback.email}</td>
                                    <td>{feedback.message}</td>

                                    </tr>
                                ))

                            )}
                            {errMsg && <p className='error-msg'>{errMsg}</p>}

                        </table>

                    </div>

                </div>
            </section>

        </>
    )
}

export default FeedBack