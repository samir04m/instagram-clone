import React, { useRef, useCallback } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import api from '../../services/api';
import { toast } from "react-toastify";

import getValidationErrors from '../../utils/getValidationErrors';

import gif from '../../assets/mobilegif.gif';
import logo from '../../assets/logo.svg';

import { Container, Gif, FormContainer, Form, Footer } from './styles';

import Input from "../../components/input";

const SignUp = () => {
    const history = useHistory();
    const formRef = useRef(null);

    const handleSubmit = useCallback( async (data) => {
        console.log(data);
        try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nombre obligatorio'),
                email: Yup.string().required('Correo obligatorio').email('Correo inválido'),
                username: Yup.string().required('Username obligatorio'),
                password: Yup.string().required('Password obligatorio').min(6, 'El password debe tener mas de 6 caracteres'),
            });

            await schema.validate(data, { abortEarly: false });

            await api.post('/users', data);

            toast.success('Te registraste con exito');

            history.push('/signin')

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
            <Gif src={gif} alt="gif" />

            <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit} >
                    <img src={logo} alt="photogram" />
                    <span>Registrate para ver fotos</span>

                    <hr/>

                    <Input name="name" placeholder="Ingrese su nombre" />
                    <Input name="email" placeholder="Ingrese su correo" />
                    <Input name="username" placeholder="Ingrese su username" />
                    <Input type="password" name="password" placeholder="Ingrese su password" />
                    
                    <button type="submit">Registrate</button>

                    <hr/>

                    <span className="footer">
                        Al registrate, aceptas nuestras condiciones
                    </span>

                    <Footer>
                        <p>
                            ¿Tienes una cuenta? <Link to="signup">Entrar</Link>
                        </p>
                    </Footer>

                </Form>
            </FormContainer>
        </Container>
    )
}

export default SignUp;