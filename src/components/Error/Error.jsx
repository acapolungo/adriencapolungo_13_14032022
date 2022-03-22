import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <>
            <main>
                <div className="hero hero--error">
                    <section className="hero-content hero-content--error ">
                        <h2 className="subtitle">Erreur 404</h2>
                        <p className="text">"Oups ! La page que vous demandez n'existe pas."</p>
                        <br/>
                        <Link className="text" to="/">
                            Retournez sur la page d'accueil
                        </Link>
                    </section>
                </div>
            </main>
        </>
    )
}
