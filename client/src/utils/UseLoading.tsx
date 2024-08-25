import { createContext, useContext, useEffect, useState } from "react";


const LoadingContext = createContext(true)

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, []);

    return (
        <LoadingContext.Provider value={isLoading}>
            {children}
        </LoadingContext.Provider>
    )
}



function UseLoading() {
 const context = useContext(LoadingContext)
    return context
}

export default UseLoading