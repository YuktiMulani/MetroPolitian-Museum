import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { authenticateUser } from "@/lib/authenticate";
import { useFavouriteListState } from "@/store";
import { useSearchHistoryState } from "@/store";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";
import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
export default function Login(props) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const[searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
   
    const router = useRouter()


    const updateAtoms = async () => {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory())
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await authenticateUser(user, password)
            await updateAtoms()
            router.push('/favourites');
        } catch (err) {
            setWarning(err.message)

        }
    }

    
    return (
        <>
            <Card bg="light" style={{marginTop: '4.5rem'}}>
                <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
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
                    <Form.Control value={password} onChange={(e)=> setPassword(e.target.value)} type="password" id="password" name="password" required/>
                </Form.Group>
                {warning && (<><br /><Alert variant="danger">{warning}</Alert></>)}
                <br />
                <Button variant="primary" className="pull-right" type="submit">Login</Button>
            </Form>
        </>
    );

}



