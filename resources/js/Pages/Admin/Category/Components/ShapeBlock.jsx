import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import {BlueButton, RedButton} from '@/Components/Buttons'
import ShapeForm from './ShapeForm';
import ShapeOptionForm from './ShapeOptionForm';

export default function ShapeBlock({className ="", category, shape=null}){
    const [destroy, setDestroy] = useState(0);
    const [editShape, setEditShape] = useState(0);
    const [editShapeOption, setEditShapeOption] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0);

    const submitDestroyShape = () =>{
        setDestroy(0);
        Inertia.delete(route('shapes.destroy', shape));
    }

    function resetStates(){
        setDestroy(0);
        setEditShape(0);
        setEditShapeOption(0);
        setSelectedOption(0);
    }

    function selectOptionToEdit(option){
        resetStates();
        setEditShapeOption(1);
        setSelectedOption(option)
    }

    function createOption (){
        resetStates();
        setEditShapeOption(1);
    }

    const controlButtons = (destroy == editShape && editShapeOption == 0)
    ?
        <>
            <BlueButton
                onHandleClick={ ()=>setEditShape(1) }
                className="small rounded-start">
                <i class="bi bi-gear-fill"></i>
            </BlueButton>
            <RedButton
                className="small rounded-end"
                onHandleClick={ ()=>setDestroy(1) }>
                <i class="bi bi-x-octagon"></i>
            </RedButton>
        </>

    :
        <BlueButton
            className="small rounded"
            onHandleClick={ resetStates }>
            <i class="bi bi-arrow-left"></i>
        </BlueButton>
    ;

    const shapeOptions = shape.shape_options.map((option) =>{
        return (
            <div className="list-group-item d-flex align-items-center">
                {option.value}
                <div className="ms-auto">
                    <BlueButton
                        onHandleClick={ ()=>selectOptionToEdit(option) }
                        className="small rounded-start">
                        <i class="bi bi-gear-fill"></i>
                    </BlueButton>
                    <RedButton
                        className="small rounded-end"
                        onHandleClick={ () => Inertia.delete(route('shape-options.destroy', option)) }>
                        <i class="bi bi-x-octagon"></i>
                    </RedButton>
                </div>
            </div>
        )
    });

    const cardBody = (destroy)?
        /*Состояник когда производится удаление Shape*/
        <RedButton
            className="w-100 h-100"
            onHandleClick={submitDestroyShape}
        >
            <i class="bi bi-x-circle"></i>
        </RedButton>

    : (editShape)?
        /*Состояник когда ведется работа с формой Shape*/
        <ShapeForm
            pastSubmit={resetStates}
            category={category}
            shape={shape}
        />

    : (editShapeOption)?
        /*Состояник когда ведется работа с формой Option*/
        <ShapeOptionForm
            pastSubmit={resetStates}
            shape={shape}
            option={selectedOption}
        />

    :
        /*Обычное состояние*/
        <>
            <div className="card-body">
                <div className="list-group list-group-flush">
                    {shapeOptions}
                </div>
            </div>
            <div className="card-footer">
                <div className="list-group-item">
                    <BlueButton
                        className="w-100 inverted"
                        onHandleClick={createOption}>
                        <i class="bi bi-plus"></i>
                    </BlueButton>
                </div>
            </div>
        </>
    ;

    return (
        <div className={" " + className}>
            <div className="card h-100">
                <div className="card-header d-flex align-items-center">
                    {shape.name}
                    <div className="ms-auto">
                        {controlButtons}
                    </div>
                </div>
                {cardBody}

            </div>
        </div>
    )
}
