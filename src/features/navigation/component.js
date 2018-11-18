import React from 'react'
import { Link } from 'react-router-dom'

export function Navigation() {
    return (
        <>
            <Link to={`/`}>Home</Link>
            <Link to={`/projects`}>Projects</Link>
        </>
    )
}