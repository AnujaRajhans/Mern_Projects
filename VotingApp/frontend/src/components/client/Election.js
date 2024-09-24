import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Election.css";
import Navbar from "../UserNavbar";

const ElectionList = () => {
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [pastElections, setPastElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5016/api/election/GetAllElection",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success === true) {
          const now = new Date();
          const elections = response.data.Election;

          const upcoming = elections.filter(
            (election) => new Date(election.Startdate) > now
          );
          const past = elections.filter(
            (election) => new Date(election.Startdate) <= now
          );

          setUpcomingElections(upcoming);
          setPastElections(past);
        } else {
          setError("No elections found");
        }
      } catch (error) {
        setError("Failed to fetch elections");
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  const handleElectionClick = (electionId) => {
    navigate(`/vote/${electionId}`);
  };

  return (
    <div className="containerfluid">
      <Navbar />
      <div className="election-container">
        <h3>Upcoming Elections:</h3>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {upcomingElections.length === 0 && !loading && (
          <p>No upcoming elections available.</p>
        )}
        {upcomingElections.map((election) => (
          <div
            className="election-item"
            key={election._id}
            onClick={() => handleElectionClick(election._id)} 
            style={{ cursor: "pointer" }}
          >
            <span className="election-name">
              {election.Title || "No Title Available"}
            </span>
            <span className="election-date" style={{ marginLeft: "30%" }}>
              {election.Startdate
                ? new Date(election.Startdate).toLocaleDateString()
                : "No Date Available"}
            </span>
          </div>
        ))}

        <h3>Past Elections:</h3>
        {pastElections.length === 0 && !loading && (
          <p>No past elections available.</p>
        )}
        {pastElections.map((election) => (
          <div className="election-item" key={election._id}>
            <span className="election-name">
              {election.Title || "No Title Available"}
            </span>
            <span className="election-date" style={{ marginLeft: "30%" }}>
              {election.Startdate
                ? new Date(election.Startdate).toLocaleDateString()
                : "No Date Available"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionList;