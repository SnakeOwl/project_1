import StandartInput from '@/Components/Inputs/StandartInput';
import { useForm } from '@inertiajs/inertia-react';

export default function Searcher(){
    const {data, setData, get} = useForm({
        string: ""
    });

    function handleSubmit(event){
        event.preventDefault();

        get(route("catalog"));
    }

    return (
        <>

        </>
    );
}
