import React from 'react';
import style from "./PageNotFound.module.css";

const PageNotFound = () => {
    return (
        <div>
            <div className={style.notFoundContainer}>
                <h1 className={style.notFoundTitle}>404</h1>
                <p className={style.notFoundText}>Página no encontrada</p>
            </div>
        </div>
    );
}

export default PageNotFound;