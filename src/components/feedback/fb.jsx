import React, { useState, useEffect } from "react";
import "./fb.css";
import { AiFillPrinter } from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import {useNavigate}  from 'react-router-dom'


function FeedBack() {
  const [fb, setFb] = useState([]);
  const [errMsg, setErrMsg] = useState();
  const [Loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const getFeedbacks = async () => {
      setLoading(true);

      try {
        const token = Cookies.get().clergyToken;

        const Allfeedbacks = await axios.get(
          "http://localhost:3005/api/user/allfeedbacks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(Allfeedbacks.data.getFeedbacks)

        setFb(Allfeedbacks.data.getFeedbacks);
        setPdfData(Allfeedbacks.data.getFeedbacks);
        setPdfLoading(false);
        setLoading(false);
      } catch (err) {
        // console.log(err)
        setLoading(false);
        setErrMsg("Sorry could not be able to get feedbacks");
      }
    };

    getFeedbacks();
  }, []);

  const downloadFeedbacks = () => {
    setLoading(true);

    // Convert the feedback data to plain text
    const plainTextData = fb.map(
      (feedback, index) =>
        `${index + 1}. Name: ${feedback.name}, Email: ${
          feedback.email
        }, Message: ${feedback.message}\n`
    );

    const plainText = plainTextData.join("");

    const blob = new Blob([plainText], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "feedbacks.txt";
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    a.remove();

    setLoading(false);
  };

  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      if (
        !Cookies.get().clergyToken ||
        Cookies.get().clergyToken === undefined
      ) {
        navigate("/login");
      } else {
        const token = Cookies.get().clergyToken;

        const res = await axios({
          method: "get",
          url: "http://localhost:3005/api/clergy/auth/verify",
          headers: { Authorization: "Bearer " + token },
          data: {},
        });

        if (res.data.type !== "success") {
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [navigate]);


  return (
    <>
      <section className="projects">
        <p className="feedback-title">Feedback from the congregants</p>

        <div className="projects-container">
          <div className="table-container">
            <AiFillPrinter className="printer" onClick={downloadFeedbacks} />

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
              {errMsg && <p className="error-msg">{errMsg}</p>}
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeedBack;
