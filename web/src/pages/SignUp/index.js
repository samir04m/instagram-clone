import React, { useState } from "react";
import { Link } from "react-router-dom";

import gif from '../../assets/mobilegif.gif';
import logo from '../../assets/logo.svg';

import { Container, Gif, FormContainer, Form, Footer } from './styles';

const SignUp = () => {
    const [input, setInput] = useState('');

    return (
        <Container>
            <Gif src={gif} alt="gif" />

            <FormContainer>
                <Form>
                    <img src={logo} alt="photogram" width='100%' />
                    <span>Registrate para ver fotos</span>

                    <hr/>

                    <input value={input} name="name" onChange={(e) => setInput(e.target.value)} />
                    
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