import React, {useState, useEffect} from 'react'
import './fb.css'
import {AiFillPrinter} from 'react-icons/ai'
import axios from 'axios'
import Cookies from 'js-cookie'
import {  AiOutlineLoading3Quarters } from "react-icons/ai";


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

                console.log(err)
                setLoading(false)
                setErrMsg('Sorry could not be able to get feedbacks')
            }
        }

        getFeedbacks()


    },[])

    const tableData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Hello, world!' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Nice project!' },
        // Add more data as needed
      ];

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
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                </tr>

                            </thead>

                            {fb.map((response, index)=>(

                                <tbody>

                                    <tr key={index}>
                                    <td>{response.id}</td>
                                    <td>{response.name}</td>
                                    <td>{response.email}</td>
                                    <td>{response.message}</td>
                                    </tr>
                                    
                                </tbody>

                             ))
                            }

                        </table>

                    </div>

                </div>
            </section>

        </>
    )
}

export default FeedBack