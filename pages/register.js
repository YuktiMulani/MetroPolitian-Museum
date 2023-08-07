import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/lib/authenticate";


export default function Register(props) {

   
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('')
    const [warning, setWarning] = useState('');

  
    const router = useRouter()


   
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await registerUser(user, password, password2)
            router.push('/login');
        } catch (err) {
            setWarning(err.message)

        }
    }


    return (
        <>
            <Card bg="light" style={{ marginTop: '4.5rem' }}>
                <Card.Body>
                    <h2>Register</h2>
                    Register for an account:</Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control value={user} onChange={(e) => setUser(e.target.value)} type="text" id="userName" name="userName" required/>
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" id="password2" name="password2" required/>
                </Form.Group>
                {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
                <br />
                <Button variant="primary" className="pull-right" type="submit">Register</Button>
            </Form>
        </>
    );

}




