import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { Container, Row, Col } from "react-bootstrap";

function LoadingCard() {
  return (
    <Container className="my-4">
      <Row className="justify-content-center g-4">
        {[1, 2, 3].map((n) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={n}
            className="d-flex justify-content-center"
          >
            <Card style={{ width: "18rem" }} className="shadow-sm">
              <div
                className="placeholder-glow"
                style={{
                  width: "100%",
                  height: "180px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "0.25rem",
                }}
              ></div>

              <Card.Body className="text-center">
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>

                <Placeholder as={Card.Text} animation="glow">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <Placeholder xs={7} />
                    <Placeholder xs={4} />
                    <Placeholder xs={4} />
                  </div>
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default LoadingCard;
