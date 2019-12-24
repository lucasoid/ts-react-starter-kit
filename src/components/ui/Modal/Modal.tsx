import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from '~components/ui/Button';
import { modalRootId } from '~components/ui/Modal';
import * as styles from './Modal.css';

export enum ModalWidth {
    SMALL,
    MEDIUM,
    LARGE,
}

interface IModalProps {
    width: ModalWidth;
    onDismiss: Function;
    children?: any;
}

export const Modal: React.FC<IModalProps> = props => {
    let el = document.createElement('div');

    React.useEffect(() => {
        document.getElementById(modalRootId).appendChild(el);
        return () => document.getElementById(modalRootId).removeChild(el);
    });

    React.useEffect(() => {
        const handler: EventListener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                props.onDismiss();
            }
        };
        window.addEventListener('keyup', handler);
        return () => window.removeEventListener('keyup', handler);
    });

    return ReactDOM.createPortal(
        <div className={styles.modalWrap}>
            <div
                role={'dialog'}
                className={`${styles.modalDialog} ${
                    props.width === ModalWidth.SMALL
                        ? styles.small
                        : props.width === ModalWidth.LARGE
                        ? styles.large
                        : styles.medium
                }`}
            >
                <div className={styles.close}>
                    <Button plaintext={true} onClick={props.onDismiss} title={'Close'}>
                        ✕
                    </Button>
                </div>
                {props.children}
            </div>
        </div>,
        el,
    );
};
