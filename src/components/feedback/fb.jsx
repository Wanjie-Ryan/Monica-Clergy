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

    //PDF

    const styles = StyleSheet.create({

        page: {
        padding: 20,
        },

        heading: {
        fontSize: 18,
        marginBottom: 10,
        },

        table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        },

        tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        },

        tableCell: {
        margin: 'auto',
        fontSize: 12,
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        },
        
  });

  const PDFDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>Feedback from the Congregants</Text>
        </View>
        <View style={styles.table}>
          {fb.map((feedback, index) => (
            <View style={styles.tableRow} key={feedback.id}>
              <View style={styles.tableCell}>{index + 1}</View>
              <View style={styles.tableCell}>{feedback.name}</View>
              <View style={styles.tableCell}>{feedback.email}</View>
              <View style={styles.tableCell}>{feedback.message}</View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );



    
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