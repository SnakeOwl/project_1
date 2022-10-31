import Input from '@/Components/Inputs/Input';
import BlueButton from '@/Components/Buttons/BlueButton';
import RedButton from '@/Components/Buttons/RedButton';
import React, { useState } from "react";

// для обновления данных в таблице, нужно в обработчике ловить индексы массива,
//ибо я не ебу как использовать setData на один индекс и передачу весь массив
export default function ParametersManager({
    id,
    name,
    values, // array [id: [left column, right column] ]
    arrayName, // ARRAY NAME for submit (exapmle: "parameters")
    leftColumnName="Характеристика",
    rightColumnName="Значение",
    disabled=false,
    handleChange,
    addRow,
    removeRow,
}){
    const tbody = values.map((item, i) => {
        if (!disabled){
            return (
                <tr>
                    <td>
                        <Input
                            name={i + ',0'}
                            handleChange={handleChange}
                            value={item[0]}
                        />
                    </td>
                    <td>
                        <Input
                            name={i + ',1'}
                            handleChange={handleChange}
                            value={item[1]}
                        />
                    </td>
                    <td>
                        <RedButton
                            type="button"
                            handleClick={() => removeRow(i)}
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
                    <th>{leftColumnName}</th>
                    <th>{rightColumnName}</th>
                    <th>Удаление</th>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
            <BlueButton
                type="button"
                handleClick={addRow}
                className="w-100"
            >
                <i class="bi bi-plus-lg"></i>
            </BlueButton>

        </>
    );
}
