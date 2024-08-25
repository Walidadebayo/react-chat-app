import { memo } from "react";
import Button from "./Button";

interface ModalProps {
  btnOnClick: () => void;
  btnText: string;
  btnColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  btnCloseColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  btnType?: "submit" | "reset" | "button";
  modalTitle: string;
  modalBody: React.ReactNode
  modalId?: string;
}

function Modal({
  btnOnClick,
  btnText,
  btnColor,
  modalTitle,
  modalBody,
  modalId,
  btnType,
  btnCloseColor,
}: ModalProps) {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby="delete-account-modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="delete-account-modalLabel">
              {modalTitle}
            </h5>
            <Button className="btn-close" dataBsDismiss="modal" type="button"/>
          </div>
          <div className="modal-body">
            {typeof modalBody === "string" ? (
              <p>{modalBody}</p>
            ) : modalBody instanceof HTMLElement ? (
              <div ref={(node) => node?.appendChild(modalBody)} />
            ) : (
              modalBody
            )}
          </div>
          <div className="modal-footer">
            <Button color={btnCloseColor} dataBsDismiss="modal" type="button">
                Close
            </Button>
            <Button onClick={btnOnClick} color={btnColor} type={btnType}>
                {btnText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Modal);
