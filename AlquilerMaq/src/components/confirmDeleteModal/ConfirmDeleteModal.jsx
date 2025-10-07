import { Modal, Button } from "react-bootstrap";

const ConfirmDeleteModal = ({ show, onHide, onConfirm, product }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header>
      <Modal.Title>Eliminar Maquina</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      ¿Seguro que deseas eliminar <strong>{product}</strong> de la lista de
      productos?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cancelar
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Sí, deseo eliminarlo
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmDeleteModal;
