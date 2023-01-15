import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup"
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from "react-icons/md";

export default function TodoList({ todos = [], setTodos }) {
    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);

    const userId = 4;
    const tripId = 1;

    const handleClose = () => {
        setShow(false);
    }

    const handleDelete = (id) => {
        axios.delete(`/api/users/${userId}/trips/${tripId}/${id}`)
            .then(() => {
                const newTodos = todos.filter(t => {
                    return t.id !== id
                });
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went wrong");
            })
    }

    const handleUpdate = async (id, value) => {
        return axios.put(`/api/users/${userId}/trips/${tripId}/${id}`, value)
            .then((res) => {
                const { data } = res;
                const newTodos = todos.map(t => {
                    if (t.id === id) {
                        return data;
                    }
                    return t;
                })
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went wrong");
            })
    }

    const renderListGroupItem = (t) => {
        return <ListGroup.Item key={t.id} className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center">
                <span style={{
                    marginRight: "12px", cursor: "pointer"
                }} onClick={() => {
                    handleUpdate(t.id)
                }}>
                    {t.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </span>
                <span>
                    {t.description}
                </span>
            </div>
            <div>
                <MdEdit style={{
                    cursor: "pointer",
                    marginRight: "12px"
                }} onClick={() => {
                    setRecord(t);
                    setShow(true);
                }} />
                <MdDelete style={{
                    cursor: "pointer"
                }} onClick={() => {
                    handleDelete(t.id);
                }} />
            </div>
        </ListGroup.Item>
    }

    const handleChange = (e) => {
        setRecord({
            ...record,
            description: e.target.value
        })
    }

    const handleSaveChanges = async () => {
        await handleUpdate(record.id, { description: record.description, completed: record.completed });
        handleClose();
    }

    const completedTodos = todos.filter(t => t.completed === true);
    const incompleteTodos = todos.filter(t => t.completed === false);

    return <div>
        <div className="mb-2 mt-4">
            To do ({completedTodos.length})
        </div>
        <ListGroup>
            {completedTodos.map(renderListGroupItem)}
        </ListGroup>
        <div className="mb-2 mt-4">
            Done ({incompleteTodos.length})
        </div>
        <ListGroup>
            {incompleteTodos.map(renderListGroupItem)}
        </ListGroup>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl value={record ? record.description : ""}
                    onChange={handleChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}