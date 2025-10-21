import React from "react";
import { Row, Col } from "react-bootstrap";

function LoadingCard() {
  return (
    <Row className="g-4">
      {[1, 2, 3].map((n) => (
        <Col xs={12} sm={6} md={4} lg={4} key={n}>
          <div className="card product-card shadow-sm w-100">
            <div
              className="card-img-top product-img placeholder-glow"
              style={{ backgroundColor: "#e9ecef" }}
            />

            <div className="card-body text-center">
              <div className="placeholder-glow mb-1">
                <span className="placeholder col-3"></span>
              </div>

              <div className="placeholder-glow mb-3">
                <div className="d-flex flex-column align-items-center gap-2">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-5"></span>
                  <span className="placeholder col-5"></span>
                </div>
              </div>

              
              <div className="d-flex justify-content-center gap-2">
                <span className="placeholder placeholder-btn col-3"></span>
                <span className="placeholder placeholder-btn col-3"></span>
                <span className="placeholder placeholder-btn col-3 d-none d-md-inline"></span>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default LoadingCard;
