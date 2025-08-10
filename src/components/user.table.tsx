import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchListUser } from "../redux/user/user.slide";
import { toast } from 'react-toastify';
import { UserCreateModal } from "./modal/modal.create.use";
import { UserUpdateModal } from "./modal/modal.update.use";
import { UserDeleteModal } from "./modal/modal.delete.use"; // import modal xóa

export const TableUser = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.user.listUser);

    // Modal create
    const [showCreate, setShowCreate] = useState(false);

    // Modal update
    const [showUpdate, setShowUpdate] = useState(false);

    // Modal delete
    const [showDelete, setShowDelete] = useState(false);

    // Dữ liệu user được chọn
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchListUser());
        toast.success("Thanh cong");
    }, [dispatch]);

    const handleShowCreate = () => setShowCreate(true);

    const handleShowUpdate = (user: any) => {
        setSelectedUser(user);
        setShowUpdate(true);
    };

    const handleShowDelete = (user: any) => {
        setSelectedUser(user);
        setShowDelete(true);
    };

    return (
        <Container>
            <div className="d-flex mb-2" style={{ justifyContent: "space-between" }}>
                <h2>Table User</h2>
                <Button variant="primary" onClick={handleShowCreate}>
                    Add new User
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button
                                    className="mx-2"
                                    variant="warning"
                                    onClick={() => handleShowUpdate(user)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleShowDelete(user)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal thêm mới */}
            <UserCreateModal
                show={showCreate}
                setShow={setShowCreate}
            />

            {/* Modal cập nhật */}
            <UserUpdateModal
                show={showUpdate}
                setShow={setShowUpdate}
                userData={selectedUser}
            />

            {/* Modal xóa */}
            <UserDeleteModal
                show={showDelete}
                setShow={setShowDelete}
                userData={selectedUser}
            />
        </Container>
    );
};
