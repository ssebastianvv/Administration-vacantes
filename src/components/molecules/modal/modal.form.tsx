import React, { useEffect, useState } from "react";
import Button from "../../atoms/button/Button"; 
import Input from "../../atoms/input/input";   

interface ModalFormProps {
    type: "vacancy" | "company";
    onSubmit: (data: any) => void; 
    onClose: () => void; 
    initialData?: any; 
}

const ModalForm: React.FC<ModalFormProps> = ({ type, onSubmit, onClose, initialData }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "open",
        company: "",
        name: "",
        location: "",
        contact: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData); 
        }
    }, [initialData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData); 
        resetForm();
        onClose(); 
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            status: "open",
            company: "",
            name: "",
            location: "",
            contact: ""
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            {type === "vacancy" && (
                <>
                    <Input label="Title" name="title" value={formData.title} onChange={handleChange} />
                    <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                    </select>
                    <Input label="Company" name="company" value={formData.company} onChange={handleChange} />
                </>
            )}
            {type === "company" && (
                <>
                    <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
                    <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
                    <Input label="Contact" name="contact" value={formData.contact} onChange={handleChange} />
                </>
            )}
            <Button type="submit" onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
            } }>Submit</Button>
        </form>
    );
};

export default ModalForm;
