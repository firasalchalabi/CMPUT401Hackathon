import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function TodoForm({ todos, setTodos }) {
    const [description, setDescription] = useState("");

    const userId = 4;
    const tripId = 1;

    const handleChange = e => {
        setDescription(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!description) {
            alert("Please provide a valid value for todo");
            return;
        }

        axios.post(`/api/users/${userId}/trips/${tripId}`, {
            "description": description
        }).then((res) => {
            setDescription("");
            const { data } = res;
            setTodos([
                ...todos,
                data
            ]).catch(() => {
                alert("Something went wrong");
            })
        })
    }

    return <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-4">
            <FormControl placeholder="New Todo"
                onChange={handleChange}
                value={description}
            />
            <Button type="submit">
                Add
            </Button>
        </InputGroup>
    </Form>
}