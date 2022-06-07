import React, { useEffect } from 'react';

import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container } from './styles';

import { ToastMessage, useToast } from '../../../hooks/ToastContext';

interface ToastProps {
    message: ToastMessage;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () = {
            clearTimeout(timer);
        }

    }, [removeToast, message.id]);


    return (
        <Container type={message.type} hasDescription={!!message.description}>
            <FiAlertCircle size={20} />
            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>
            <button onClick={() => removeToast(message.id)} type="button">
                <FiXCircle />
            </button>
            ;
        </Container>
    );
};

export default Toast;
