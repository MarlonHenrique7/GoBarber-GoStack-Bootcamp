import React, { useRef, useCallback, useMemo } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';

import Button from '../../components/Button';
import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
    email: string;
    password: string;
}
const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    // const { user, signIn } = useContext(AuthContext);
    const { signIn } = useAuth();
    const { addToast } = useToast();

    const location = useLocation();
    const navigate = useNavigate();

    const navigatePathname = useMemo(() => {
        const state = location.state as { from: { pathname: string } };
        if (state && state.from) {
            return state.from.pathname;
        }
        return '/dashboard';
    }, [location]);

    const handlesubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    // name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, { abortEarly: false });
                await signIn({
                    email: data.email,
                    password: data.password,
                });
                navigate(navigatePathname, { replace: true });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(
                        err as Yup.ValidationError,
                    );
                    formRef.current?.setErrors(errors);
                }

                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description: 'Ocorreu um erro, verifique.',
                });
            }
        },
        [signIn, addToast, navigate, navigatePathname],
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handlesubmit}>
                        <h1>Faça seu logon</h1>

                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />
                        <Input
                            icon={FiLock}
                            name="password"
                            type="password"
                            placeholder="Senha"
                        />
                        <Button type="submit">Entrar</Button>
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
