import React from "react";
import styles from "./card.module.scss"; 
import { icons } from "@/components/atoms/Icons";
import { IVacancy, ICompany } from "../../../interface/interfaces";

interface CardProps {
    data: IVacancy | ICompany; // Cambia el tipo de data a IVacancy | ICompany
    onEdit: () => void;
    onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ data, onEdit, onDelete }) => {
    return (
        <div className="card-container">
            <div className={styles.card}>
                {/* Verifica si data es una vacante o una compañía */}
                {isVacancy(data) ? (
                    <>
                        <h3 className={styles.title}>{data.title}</h3>
                        <p className={styles.text}>{data.description}</p>
                        <p className={styles.text}>Status: {data.status}</p>
                        <p className={styles.text}>Company: {data.company.name}</p>
                    </>
                ) : (
                    <>
                        <h3 className={styles.title}>{data.name}</h3>
                        <p className={styles.text}>Location: {data.location}</p>
                        <p className={styles.text}>Contact: {data.contact}</p>
                    </>
                )}
                <div className={styles['card-buttons']}>
                    <button onClick={onEdit} className={`${styles['edit-button']} ${styles.button}`}>
                        {icons.pencil}
                    </button>
                    <button onClick={onDelete} className={`${styles['delete-button']} ${styles.button}`}>
                        {icons.trash}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Función para determinar si el objeto es una vacante
const isVacancy = (data: IVacancy | ICompany): data is IVacancy => {
    return (data as IVacancy).title !== undefined;
};

export default Card;
