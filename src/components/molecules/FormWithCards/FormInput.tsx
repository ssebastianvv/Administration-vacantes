"use client"
import React, { useEffect, useState } from "react";
import Button from "../../atoms/button/Button"; 
import Card from "../card/card";     
import Modal from "../../atoms/modal/modal"; 
import ModalForm from "../modal/modal.form"; 
import { CoderService } from '../../../services/admi.service';
import { IVacancy, ICompany } from '../../../interface/interfaces';

interface FormWithCardsProps {
    type: "vacancy" | "company";
}

const FormWithCards: React.FC<FormWithCardsProps> = ({ type }) => {
    const [cards, setCards] = useState<(IVacancy | ICompany)[]>([]); // Permite ambos tipos
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState<IVacancy | ICompany | null>(null);
    const coderService = new CoderService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await coderService.findAll();
                setCards(data.content); // Ajusta según tu respuesta
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    const handleFormSubmit = async (data: IVacancy | ICompany) => {
        try {
            const newData = await coderService.create(data); // El servicio manejará el tipo
            setCards((prevCards) => [...prevCards, newData]);
        } catch (error) {
            console.error('Error al crear los datos:', error);
        }
    };

    const handleEdit = (index: number) => {
        const cardToEdit = cards[index];
        setSelectedData(cardToEdit);
        setIsModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await coderService.destroy(id);
            setCards(cards.filter(card => card.id !== id));
        } catch (error) {
            console.error('Error al eliminar los datos:', error);
        }
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
                    onSubmit={async (data) => {
                        if (selectedData) {
                            await coderService.update(selectedData.id.toString(), data); // El servicio manejará el tipo
                            setCards(cards.map(card => card.id === selectedData.id ? { ...card, ...data } : card));
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
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        data={card}
                        onEdit={() => handleEdit(index)}
                        onDelete={() => handleDelete(card.id.toString())}
                    />
                ))}
            </div>
        </div>
    );
};

export default FormWithCards;
