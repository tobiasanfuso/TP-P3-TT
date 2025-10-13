import React from "react";
import { Table, Placeholder } from "react-bootstrap";

const LoadingUsers = ({ role }) => {
  return (
    <div className="my-3">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            {role === "sysadmin" && (
              <>
                <th>Rol</th>
                <th>Acción</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((n) => (
            <tr key={n}>
              <td>
                <Placeholder as="span" animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
              </td>
              <td>
                <Placeholder as="span" animation="glow">
                  <Placeholder xs={8} />
                </Placeholder>
              </td>
              {role === "sysadmin" && (
                <>
                  <td>
                    <Placeholder as="span" animation="glow">
                      <Placeholder xs={5} />
                    </Placeholder>
                  </td>
                  <td>
                    <Placeholder.Button variant="danger" xs={6} />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LoadingUsers;
