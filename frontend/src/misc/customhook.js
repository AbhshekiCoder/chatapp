import { useState, useCallback } from "react"


export function useModalState( defaultValue = false){
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(()=> setIsOpen(true), console.log(isOpen), []);
    const close = useCallback(() => setIsOpen(false), console.log(isOpen), []);
    
    return {isOpen, open, close}
}