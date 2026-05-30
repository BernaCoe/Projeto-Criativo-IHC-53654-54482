
import './Modal.css';

function Modal({ type, heading, message, onConfirm, onCancel, confirmLabel, cancelLabel = 'Não' }) {
  const defaultConfirm = onCancel ? 'Sim' : 'OK';

  return (
    <div className="modal-overlay">
      <div className={`modal-box ${type}`}>
        {heading && <div className="modal-heading">{heading}</div>}
        <div className="modal-message">{message}</div>
        <div className="modal-actions">
          {onCancel && (
            <button className="modal-btn cancel" onClick={onCancel}>
              {cancelLabel}
            </button>
          )}
          <button className="modal-btn confirm" onClick={onConfirm}>
            {confirmLabel || defaultConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;