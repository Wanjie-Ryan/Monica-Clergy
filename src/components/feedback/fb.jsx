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



            }

            catch(err){

                console.log(err)
                setLoading(false)
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

                            <tbody>

                                {tableData.map((dataItem) => (
                                    <tr key={dataItem.id}>
                                    <td>{dataItem.id}</td>
                                    <td>{dataItem.name}</td>
                                    <td>{dataItem.email}</td>
                                    <td>{dataItem.message}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>
            </section>

        </>
    )
}

export default FeedBack