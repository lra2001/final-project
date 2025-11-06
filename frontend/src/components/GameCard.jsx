import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function GameCard({ game }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className="card bg-dark text-light"
        style={{ width: "200px", cursor: "pointer" }}
        onClick={() => setShow(true)}
      >
        <img src={game.background_image} alt={game.name} className="card-img-top" />
        <div className="card-body">
          <h6 className="card-title">{game.name}</h6>
          <p className="small text-white"><i class="bi bi-star"> </i>{game.rating}</p>
          <p className="small text-white"><i class="bi bi-joystick"> </i>{game.platforms?.map(p => p.platform.name).join(", ")}</p>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{game.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={game.background_image} alt={game.name} className="img-fluid mb-3 rounded" />
          <p><strong>Released:</strong> {game.released}</p>
          <p><strong>Rating:</strong> {game.rating}</p>
          <p><strong>Platforms:</strong> {game.platforms?.map(p => p.platform.name).join(", ")}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}