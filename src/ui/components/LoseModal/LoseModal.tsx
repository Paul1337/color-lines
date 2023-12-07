import React from 'react';
import styles from './LoseModal.module.css';

export const LoseModal = () => {
    return (
        <div className={styles.div}>
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Oswald&family=Source+Serif+4&display=swap');
            </style>
            <p className={styles.text}>YOU LOSE</p>
        </div>
    );
};
