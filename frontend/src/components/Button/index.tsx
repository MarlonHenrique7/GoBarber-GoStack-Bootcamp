import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/* eslint-disable react/jsx-props-no-spreading */

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <Container type="button" {...rest}>
        {children}
    </Container>
);

export default Button;
