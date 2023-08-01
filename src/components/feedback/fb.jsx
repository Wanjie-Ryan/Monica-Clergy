import React from 'react'
import './fb.css'




function FeedBack (){

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