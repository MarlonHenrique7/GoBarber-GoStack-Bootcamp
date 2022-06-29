import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';
import { useToast } from '../../hooks/ToastContext';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const navigate = useNavigate();
    const handlesubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().min(6, 'No mínimo 6 dígitos'),
                });

                await schema.validate(data, { abortEarly: false });

                await api.post('/users', data);

                addToast({
                    type: 'success',
                    title: 'Cadastro realizado!',
                    description: 'Você já pode fazer seu login.',
                });
                navigate('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(
                        err as Yup.ValidationError,
                    );
                    formRef.current?.setErrors(errors);
                }

                addToast({
                    type: 'error',
                    title: 'Erro no cadastro',
                    description: 'Ocorreu um erro, verifique.',
                });
            }
        },
        [addToast, navigate],
    );

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form
                    ref={formRef}
                    // initialData={{ name: 'Diego' }}
                    onSubmit={data => handlesubmit(data)}
                >
                    <h1>Faça seu Cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <Link to="/">
                    <FiLogIn />
                    Voltar para Logon
                </Link>
            </Content>
        </Container>
    );
};

export default SignUp;
