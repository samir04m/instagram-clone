import React, { useRef, useCallback } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import api from '../../services/api';
import { toast } from "react-toastify";

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import { Container, FormContainer, Form, Footer } from './styles';

import Input from "../../components/input";

const SignIn = () => {
    const history = useHistory();
    const formRef = useRef(null);

    const handleSubmit = useCallback( async (data) => {
        console.log(data);
        try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                username: Yup.string().required('Username obligatorio'),
                password: Yup.string().required('Password obligatorio'),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/auth', data);

            history.push('/')

        } catch (error) {
            if (error instanceof Yup.ValidationError){
                const errors = getValidationErrors(error);
                formRef.current.setErrors(errors);
                return;
            }

            toast.error(error.response.data.message);
        }

    }, [])  

    return (
        <Container>

            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <img src={logo} alt="photogram" />
                    <span>Inicia sesión para ver fotos de tus amigos</span>

                    <hr/>

                    <Input name="username" placeholder="Ingrese su username" />
                    <Input type="password" name="password" placeholder="Ingrese su password" />
                    
                    <button type="submit">Registrate</button>

                    <hr/>

                    <span className="footer">
                        Mira lo que tus amigos tiene preparado para ti.
                    </span>

                    <Footer>
                        <p>
                            ¿No tienes una cuenta? <Link to="signup">Registrarme</Link>
                        </p>
                    </Footer>

                </Form>
            </FormContainer>
        </Container>
    )
}

export default SignIn;