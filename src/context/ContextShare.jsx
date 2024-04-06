import React, { createContext, useState } from 'react'

export const addNoteResponseContext = createContext()
export const editNoteResponseContext = createContext();
export const isAuthTokenContext = createContext();

function ContextShare({ children }) {
    // children is a predefined used to share data between components
    // create a state that need to be shared
    const [addNoteResponse, setAddNoteResponse] = useState({})
    const [editNoteResponse, setEditNoteResponse] = useState({})
    const [isAuthToken, setIsAuthToken] = useState(false)
    return (
        <>
            <addNoteResponseContext.Provider value={{ addNoteResponse, setAddNoteResponse }}>
                <editNoteResponseContext.Provider value={{ editNoteResponse, setEditNoteResponse }}>
                    <isAuthTokenContext.Provider value={{ isAuthToken, setIsAuthToken }}>
                        {children}
                    </isAuthTokenContext.Provider>
                </editNoteResponseContext.Provider>
            </addNoteResponseContext.Provider>
        </>
    )
}

export default ContextShare