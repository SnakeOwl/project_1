import { usePage } from '@inertiajs/inertia-react';
import Input from '@/Components/Inputs/Input';
import {BlueButton, RedButton} from '@/Components/Buttons';
import React from "react";

// для обновления данных в таблице, нужно в обработчике ловить индексы массива,
//ибо я не ебу как использовать setData на один индекс и передачу весь массив
export default function ParametersManager({
    id,
    name,
    values, // array [id: [left column, right column] ]
    arrayName, // ARRAY NAME for submit (exapmle: "parameters")
    disabled=false,
    onHandleChange,
    addRow,
    removeRow,
}){
    const {lang} = usePage().props;

    const tbody = values.map((item, i) => {
        if (!disabled){
            return (
                <tr>
                    <td>
                        <Input
                            name={i + ',param_name'}
                            onHandleChange={onHandleChange}
                            value={item.param_name}
                            required
                        />
                    </td>
                    <td>
                        <Input
                            name={i + ',param_value'}
                            onHandleChange={onHandleChange}
                            value={item.param_value}
                        />
                    </td>
                    <td>
                        <Input
                            name={i + ',param_name_en'}
                            onHandleChange={onHandleChange}
                            value={item.param_name_en}
                            required
                        />
                    </td>
                    <td>
                        <Input
                            name={i + ',param_value_en'}
                            onHandleChange={onHandleChange}
                            value={item.param_value_en}
                        />
                    </td>
                    <td>
                        <RedButton
                            type="button"
                            onHandleClick={() => removeRow(i)}
                            className="small"
                        >
                            <i class="bi bi-x-lg"></i>
                        </RedButton>
                    </td>
                </tr>
            );
        }else{
            return (
                <tr>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                </tr>
            );
        }
    });

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <th>{lang["parameters field name"]}</th>
                    <th>{lang["parameters field value"]}</th>
                    <th>{lang["parameters field name en"]}</th>
                    <th>{lang["parameters field value en"]}</th>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>

            <BlueButton
                type="button"
                onHandleClick={addRow}
                className="w-100"
            >
                <i class="bi bi-plus-lg"></i>
            </BlueButton>

        </>
    );
}
