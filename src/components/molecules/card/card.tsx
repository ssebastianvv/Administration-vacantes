import React from "react";
import styles from "./card.module.scss"; 
import { icons } from "@/components/atoms/Icons";

interface CardProps {
    data: {
        title?: string;
        description?: string;
        status?: string;
        company?: string;
        name?: string;
        location?: string;
        contact?: string;
    };
    onEdit: () => void;
    onDelete: () => void;
}
// creacion de
const Card: React.FC<CardProps> = ({ data, onEdit, onDelete }) => {
    return (
        <div className="card-container">
            <div className={styles.card}> {/* Usa el estilo de módulo aquí */}
                {data.title && <h3 className={styles.title}>{data.title}</h3>}
                {data.description && <p className={styles.text}>{data.description}</p>}
                {data.status && <p className={styles.text}>Status: {data.status}</p>}
                {data.company && <p className={styles.text}>Company: {data.company}</p>}
                {data.name && <p className={styles.text}>Name: {data.name}</p>}
                {data.location && <p className={styles.text}>Location: {data.location}</p>}
                {data.contact && <p className={styles.text}>Contact: {data.contact}</p>}
                <div className={styles['card-buttons']}> {/* Usa el estilo de módulo aquí */}
                    <button onClick={onEdit} className={`${styles['edit-button']} ${styles.button}`}>{icons.pencil}</button>
                    <button onClick={onDelete} className={`${styles['delete-button']} ${styles.button}`}>{icons.trash}</button>
                    
                </div>
            </div>
      </div>
      );
};

export default Card;
