import { Container, Form, Navbar } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { changeMode } from "../redux/app/app.slide";

export const Header = () => {
    const users = useAppSelector(state => state.user.listUser);
    const mode = useAppSelector(state => state.app.mode);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const body = document.querySelector("body");
        if (body) body.setAttribute('data-bs-theme', mode);
    }, [mode])
    return (
        <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
            <Container>
                <Navbar.Brand href="#home">Navbar with text {users.length}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Form>
                        <Form.Check // prettier-ignore
                            value={mode}
                            onChange={(e) => dispatch(changeMode(e.target.value === "light" ? "dark" : "light"))}
                            type="switch"
                            id="custom-switch"
                            label={mode === "light"
                                ? <Navbar.Text>Light mode</Navbar.Text>
                                : <Navbar.Text>Dark mode</Navbar.Text>}
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}