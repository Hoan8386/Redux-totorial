import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteUser, resetDelete } from "../../redux/user/user.slide";
import { toast } from "react-toastify";

export const UserDeleteModal = (props: any) => {
    const { show, setShow, userData } = props;
    const dispatch = useAppDispatch();

    const handleClose = () => setShow(false);

    const isDeleteSuccess = useAppSelector(state => state.user.isDeleteSuccess);

    // Khi xóa thành công
    useEffect(() => {
        if (isDeleteSuccess) {
            setShow(false);
            toast.success("Delete user success");
            dispatch(resetDelete());
        }
    }, [isDeleteSuccess]);

    const handleDelete = () => {
        if (userData?.id) {
            dispatch(deleteUser(userData.id));
        }
    };

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa người dùng{" "}
                <strong>{userData?.name}</strong> ({userData?.email}) không?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Confirm
                </Button>
                <Button onClick={handleClose} variant="secondary">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
