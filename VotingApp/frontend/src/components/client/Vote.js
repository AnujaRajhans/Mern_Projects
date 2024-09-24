import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/Vote.css';

const Vote = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { electionId } = useParams();  // Retrieve electionId from URL params

  const handleProceed = () => {
    if (isChecked) {
      // If the user agrees, navigate to the voting panel with electionId
      navigate(`/voting-panel/${electionId}`);
    } else {
      alert('Please confirm that you understand the steps by checking the box.');
    }
  };

  return (
    <div className="vote-page container-v mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h5 className="card-title text-center">
            This election is being conducted by the Election Commission of India.
          </h5>
          <p className="text-center">
            As a member of the constituency under the Uttar Pradesh State Election, you are allowed to vote...
          </p>
          <div className="instructions-box">
            <h6>Steps:</h6>
            <ul>
              <li>Stay in the frame of your camera alone with sufficient lighting.</li>
              <li>Have Security Keys with you.</li>
              <li>You are allowed to vote only once per election.</li>
              <li>Choose only one candidate per election.</li>
              <li>Verify your selected candidate before submitting your vote.</li>
              <li>Results will be announced five days after the election.</li>
            </ul>
          </div>
          <div className="d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="confirm"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}  // Toggle checkbox state
              />
              <label className="form-check-label" htmlFor="confirm">
                I understand and will follow the above steps.
              </label>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)}>Cancel</button>
            <button className="btn btn-primary mx-2" onClick={handleProceed}>Proceed</button>  {/* Proceed button */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;