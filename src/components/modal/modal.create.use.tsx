import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewUser, resetCreate, } from "../../redux/user/user.slide";
import { toast } from "react-toastify";

export const UserCreateModal = (prop: any) => {
    const { show, setShow } = prop;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const dispatch = useAppDispatch();
    const saveUser = () => {
        dispatch(createNewUser({ email, name }));
    }
    const handleClose = () => setShow(false);

    const isCreateSuccess = useAppSelector(sate => sate.user.isCreateSuccess);
    useEffect(() => {
        if (isCreateSuccess == true) {
            setShow(false);
            setEmail("")
            setName("")
            dispatch(resetCreate())
            toast("create user success");
        }
    }, [isCreateSuccess])
    return (
        <>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingName" label="Name">
                        <Form.Control type="name" placeholder="Name"
                            onChange={(e) => setName(e.target.value)} />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => {
                        saveUser();
                    }}>Save</Button>
                    <Button onClick={() => {
                        handleClose();
                    }} variant="danger">Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}