"use client"
import { BlueButtonReversed, RedButtonReversed } from "@/_Components/Buttons/ColoredButtons";
import { Input } from "@/_Components/Inputs/Input";
import IParameter from "@/interfaces/IParameter";





interface IParams {
    parameters: IParameter[]
    setParameters: Function
    dict: any
}


export default function Parameters({
    parameters,
    setParameters,
    dict
}: IParams) {

    function addParameter() {
        parameters.push({
            param_name: "",
            param_name_en: "",
            param_value: "",
            param_value_en: "",
        });

        setParameters(parameters);
    }

    function removeParameter(index: number) {
        delete parameters[index];

        setParameters(parameters);
    }
    
    function updateParameter(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        parameters[index] = {
            ...parameters[index],
            [e.target.id]: e.target.value
        }

        setParameters(parameters);
    }

    return (
        <div className="flex flex-wrap">
            <div className="2xl:w-1/3 px-2">
                <div className="rounded-lg">
                    <BlueButtonReversed
                        onClick={addParameter}
                        className="w-full text-center py-16 rounded-lg"
                        type="button"
                    >
                        <i className="bi bi-plus-lg"></i>
                    </BlueButtonReversed>
                </div>
            </div>

            {parameters && parameters.map((par, i) => {
                return (
                    <div className="2xl:w-1/3 p-2" key={i}>
                        <div className="p-2 border border-gray-500 rounded-lg">
                            <Input
                                id={"param_name"}
                                value={par.param_name}
                                label={dict["parameters field name"]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateParameter(e, i)}}
                                className="mb-1"
                            />

                            <Input
                                id={"param_name_en"}
                                value={par.param_name_en}
                                label={dict["parameters field name en"]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateParameter(e, i)}}
                                className="mb-1"
                            />

                            <Input
                                id={"param_value"}
                                value={par.param_value}
                                label={dict["parameters field value"]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateParameter(e, i)}}
                                className="mb-1"
                            />

                            <Input
                                id={"param_value_en"}
                                value={par.param_value_en}
                                label={dict["parameters field value en"]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{updateParameter(e, i)}}
                                className="mb-4"
                            />

                            <RedButtonReversed
                                className="w-1/2 mx-auto py-1 rounded-md block"
                                onClick={() => { removeParameter(i) }}
                                type="button"
                            >
                                <i className="bi bi-x-lg"></i>
                            </RedButtonReversed>
                        </div>
                    </div>
                );
            })
            }
        </div>
    )
}