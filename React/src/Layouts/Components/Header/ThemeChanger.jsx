import { useState } from "react";

export default function ThemeChanger(){
    
    const localTheme = localStorage.getItem("theme");
    let defaultTheme = "dark"; // or "light"

    if (localTheme === null){
        const d = new Date();
        const hour = d.getHours(); // returns 0-23 format
        defaultTheme = (hour > 17 || hour < 8)? "dark": "light";
    }

    const [theme, setTheme] = useState( localTheme !== null? localTheme: defaultTheme);
    document.getElementsByTagName('html')[0].setAttribute("data-bs-theme", theme);

    const image = theme == "dark"? <i className="bi bi-moon"></i>: <i className="bi bi-sun"></i>;

    function changeTheme(){
        if (theme === "dark"){
            setTheme("light");
            localStorage.setItem('theme', 'light')
        }else{
            setTheme("dark");
            localStorage.setItem('theme', 'dark')
        }
    }

    return (
        <button 
            onClick={changeTheme}
            className="bttn small rounded border"
        >
            {image}
        </button>
    );
}