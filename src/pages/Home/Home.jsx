import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPdfData, pdfSelector } from "../../redux/Reducers/pdfReducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faEye, faInfoCircle } from "@fortawesome/free-solid-svg-icons"; // Import the PDF icon
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [pdfData, setPdfData] = useState([]);
  const dispatch = useDispatch();
  const filteredResults = useOutletContext();

  const Data = useSelector(pdfSelector);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchPdfData());
  }, [dispatch]);

  // Update `pdfData` only if the new value is different
  useEffect(() => {
    if (filteredResults && filteredResults.length > 0) {
      if (JSON.stringify(filteredResults) !== JSON.stringify(pdfData)) {
        setPdfData(filteredResults);
      }
    } else {
      if (JSON.stringify(Data) !== JSON.stringify(pdfData)) {
        setPdfData(Data);
      }
    }
  }, [filteredResults, Data, pdfData]);

  return (
    <div className="home-container">
      <div className="pdf-list">
        {pdfData && pdfData.length > 0 ? (
          pdfData.map((pdf, index) => (
            <div className="item" key={index}>
              <div className="item-icon">
                <FontAwesomeIcon icon={faFilePdf} size="2x" color="#406ff3" />
              </div>
              <div className="item-info">
                <span className="pdf-name">{pdf.name || "N/A"}</span>
              </div>
              <div className="item-actions">
                <button className="pdf-btn view-btn">
                  <Link to={pdf.link}>
                    <FontAwesomeIcon icon={faEye} /> View Pdf
                  </Link>
                </button>
                
                  <button className="pdf-btn remove-btn">
                  <Link to={`DetailedView/${index}`}>
                    <FontAwesomeIcon icon={faInfoCircle} /> Pdf Details
                    </Link>
                  </button>
                
              </div>
            </div>
          ))
        ) : (
          <p className="loading-btn" >Loading pdf...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
