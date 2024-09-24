import React from 'react';
import '../CSS/ReadMore.css';

function ReadMore() {
  return (
    <div className="features-page">
      <Features />
    </div>
  );
}
const Features = () => (
  <section className="features-section">
    <div className="features-title">
      <h2>Features</h2>
    </div>
    <div className="features-list">
      <div className="feature-item">
        <i className="bi bi-lock-fill"></i>
        <p>Secured by 256-bit encryption</p>
      </div>
      <div className="feature-item">
        <i className="bi bi-ethernet"></i>
        <p>Backed by ethereum-based technology</p>
      </div>
      <div className="feature-item">
        <i className="bi bi-check2-square"></i>
        <p>Verifiable transactions</p>
      </div>
      <div className="feature-item">
        <i className="bi bi-hand-index"></i>
        <p>Easy to use</p>
      </div>
      <div className="feature-item">
        <i className="bi bi-currency-dollar"></i>
        <p>Cheaper than ballot voting system</p>
      </div>
      <div className="feature-item">
        <i className="bi bi-clock"></i>
        <p>Faster voting process</p>
      </div>
    </div>
  </section>
);

export default ReadMore;