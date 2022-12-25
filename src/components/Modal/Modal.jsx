import css from "./Modal.module.css";

export const Modal = ({ avatar: { src, alt }, onClose }) => {
    return (
        <div className={css.backdrop}>
            <div className={css.modal}>
                <img src={src} alt={alt} />
                <button type="button" className={css.button} onClick={onClose}>Close</button>
            </div>
        </div>
    )
}