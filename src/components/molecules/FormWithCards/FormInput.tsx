"use client"
import React, { useState } from "react";
import Button from "../../atoms/button/Button"; 
import Card from "../card/card";     
import Modal from "../../atoms/modal/modal"; 
import ModalForm from "../modal/modal.form"; 

interface FormWithCardsProps {
    type: "vacancy" | "company";
}

const FormWithCards: React.FC<FormWithCardsProps> = ({ type }) => {
    const [cards, setCards] = useState<{ [key: number]: any }>({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null); 

    const handleFormSubmit = (data: any) => {
        setCards((prevCards) => ({
            ...prevCards,
            [Object.keys(prevCards).length]: data,
        }));
    };

    const handleEdit = (index: number) => {
        const cardToEdit = cards[index];
        setSelectedData({ ...cardToEdit, index }); 
        setIsModalVisible(true); 
    };

    const handleDelete = (index: number) => {
        const newCards = { ...cards };
        delete newCards[index];
        setCards(newCards);
    };

    return (
        <div>
            <Button onClick={() => {
                setSelectedData(null); 
                setIsModalVisible(true);
            }}>
                Agregar {type === "vacancy" ? "Vacante" : "Compañía"}
            </Button>

            <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <ModalForm 
                    type={type} 
                    onSubmit={(data) => {
                        if (selectedData) {
                            
                            const updatedCards = { ...cards, [selectedData.index]: data };
                            setCards(updatedCards);
                        } else {
                            handleFormSubmit(data); 
                        }
                        setIsModalVisible(false);
                        setSelectedData(null); 
                    }} 
                    onClose={() => setIsModalVisible(false)} 
                    initialData={selectedData}
                />
            </Modal>

            <div className="cards-container">
                {Object.keys(cards).map((key) => (
                    <Card
                        key={key}
                        data={cards[Number(key)]}
                        onEdit={() => handleEdit(Number(key))}
                        onDelete={() => handleDelete(Number(key))}
                    />
                ))}
            </div>
        </div>
    );
};

export default FormWithCards;
