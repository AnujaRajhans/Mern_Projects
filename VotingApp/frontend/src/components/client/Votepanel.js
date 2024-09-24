
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "../CSS/VotePanel.css";

const VotingPanel = () => {
  const { electionId } = useParams(); 
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => { 
    const fetchCandidates = async () => {
      try {
        const voteCheckResponse = await axios.get(
          `http://localhost:5016/api/vote/${electionId}/hasVoted`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
          }
        );
        if (voteCheckResponse.data.hasVoted) {
          setHasVoted(true);
          return;
        }
        const response = await axios.get(
          `http://localhost:5016/api/election/${electionId}/candidates`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setCandidates(response.data.candidates || []);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching candidates or vote status:", error.message);
      }
    };
    fetchCandidates();
  }, [electionId]);

  const handleSelect = async (candidateId) => {
    console.log(candidateId)
    const selected = candidates.find((candidate) => candidate._id === candidateId);
    setSelectedCandidate(selected);

    try {
      const response = await axios.get(
        `http://localhost:5016/api/Candidate/GetCandidateInfo/${candidateId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCandidateInfo(response.data.Candidate);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching candidate info:", error.message);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCandidate) {
      toast.error("Please select a candidate before voting!", {
        position: "top-center",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5016/api/Vote/AddVote",
        { electionId, candidateId: selectedCandidate._id }, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success(`You have voted for ${selectedCandidate.Cname}`, {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/election"); 
      }, 2000);

    } catch (error) {
      console.error("Error submitting vote:", error.message);
      toast.error("Failed to submit vote", {
        position: "top-center",
      });
    }
  };

  if (hasVoted) {
    return (
      <div className="voting-panel-container">
        <h3 className="voting-panel-title" style={{ color: "white" }}>
          Voting Panel for Election
        </h3>
        <p style={{ color: "white", textAlign: "center" }}>
          You have already voted in this election. Thank you for your participation.
        </p>
        <Button
          variant="secondary"
          onClick={() => navigate("/election")}
        >
          Go Back to Elections
        </Button> 
      </div>
    );
  }

  return (
    <div className="voting-panel-container">
      <ToastContainer />
      <h3 className="voting-panel-title" style={{ color: "white" }}>
        Voting Panel for Election
      </h3>

      <div className="selected-candidate-card">
        {candidateInfo && (
          <Card>
            <Card.Header>
              <div className="candidate-header">
                <div className="candidate-icon">
                  <span className="icon-circle">
                  {candidateInfo.DP ? (
            <img src={candidateInfo.DP} alt={candidateInfo.Cname} className="candidate-image" />
          ) : (
            <span className="icon-circle">No Image</span>
          )}
                  </span>
                </div>
                <div className="candidate-details">
                  <span className="candidate-name">
                    {candidateInfo.Cname || "No Name"}
                  </span>
                  <span className="candidate-party">
                    {candidateInfo.Party || "No Party"}
                  </span>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <p>Name: {candidateInfo.Cname || "No Name"}</p>
              <p>Age: {candidateInfo.Age || "No Age"}</p>
              <p>Party: {candidateInfo.Party || "No Party"}</p>
              <p>Education: {candidateInfo.Education || "No Education"}</p>
            </Card.Body>
          </Card>
        )}
      </div>

      <div className="candidate-selection">
        {candidates && candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="candidate-option"
              onClick={() => handleSelect(candidate._id)}
              style={{ cursor: "pointer" }}
            >
              <span>{candidate.Cname}</span>
              <span>{candidate.Party}</span>
            </div>
          ))
        ) : (
          <p>No candidates available</p>
        )}

        <div className="confirm-checkbox">
          <input type="checkbox" id="confirmVote" />
          <label htmlFor="confirmVote">
            I have selected{" "}
            {selectedCandidate ? selectedCandidate.Cname : "N/A"} from{" "}
            {selectedCandidate ? selectedCandidate.Party : "N/A"} as my candidate.
          </label>
        </div>

        <div className="button-group">
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/election")}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VotingPanel;