import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateUser, resetUpdate } from "../../redux/user/user.slide";
import { toast } from "react-toastify";

export const UserUpdateModal = (props: any) => {
    const { show, setShow, userData } = props;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const dispatch = useAppDispatch();

    const handleClose = () => setShow(false);

    // Lấy state thành công từ store
    const isUpdateSuccess = useAppSelector(state => state.user.isUpdateSuccess);

    // Khi modal mở, set dữ liệu từ userData
    useEffect(() => {
        if (userData) {
            setEmail(userData.email || '');
            setName(userData.name || '');
        }
    }, [userData]);

    // Khi update thành công
    useEffect(() => {
        if (isUpdateSuccess) {
            setShow(false);
            toast.success("Update user success");
            dispatch(resetUpdate());
        }
    }, [isUpdateSuccess]);

    const saveUpdate = () => {
        dispatch(updateUser({ id: userData.id, email, name }));
    };

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Update user</Modal.Title>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingName" label="Name">
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={saveUpdate}>
                    Save Changes
                </Button>
                <Button onClick={handleClose} variant="danger">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
