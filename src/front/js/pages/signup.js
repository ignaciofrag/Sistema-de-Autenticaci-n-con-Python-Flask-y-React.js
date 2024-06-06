import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                navigate('/login');
            } else if (response.status === 409) {
                alert('User already exists');
            } else {
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: 'black' }}>
            <Row className="w-100">
                <Col md={{ span: 4, offset: 4 }}>
                    <Form onSubmit={handleSubmit} className="p-4 rounded" style={{ backgroundColor: 'white' }}>
                        <h3 className="text-center">Registro</h3>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100 mt-3">Registrarte</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
