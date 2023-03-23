import { Button } from "../Buttons";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function ThemeChanger(){
    const {themeColor} = usePage().props;

    return(
        <Button 
            className={"small rounded border"}
            onHandleClick={()=>Inertia.get(route("change-theme"))
        }>
            {(themeColor == "dark") &&
                <i className="bi bi-sun"></i>
            }
            {(themeColor != "dark") &&
                <i className="bi bi-moon"></i>
            }
        </Button>
    );
}