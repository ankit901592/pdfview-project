import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPdfData, pdfSelector } from "../../redux/Reducers/pdfReducers";
import "./Detailedview.css"; // Import the CSS file
import { useParams } from "react-router-dom";
const DetailedView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Find the PDF that matches the id
  const data = useSelector(pdfSelector);
  useEffect(() => {
    // Fetch data if not already fetched if
    if (!data || data.length === 0) {
      dispatch(fetchPdfData());
    }
  }, [dispatch, data]);
  console.log(data);
  console.log(id);

  const pdf = data.find((item, index) => index === id);
  console.log(pdf);

  if (!pdf) {
    return <div>PDF not found</div>;
  }

  return (
    <div className="detailed-view-container">
      <h1 className="header">Detailed View</h1>
      {pdf ? (
        <div className="pdf-card">
          {" "}
          <h2 className="pdf-title">{pdf.name}</h2>{" "}
          <p className="pdf-description">Author: {pdf.author}</p>{" "}
          <div className="pdf-metadata">
            {" "}
            <span>Published: {pdf.published}</span>{" "}
            <a
              href={pdf.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
            >
              {" "}
              View PDF{" "}
            </a>{" "}
          </div>{" "}
        </div>
      ) : (
        <p>No PDFs available to display.</p>
      )}
    </div>
  );
};

export default DetailedView;
