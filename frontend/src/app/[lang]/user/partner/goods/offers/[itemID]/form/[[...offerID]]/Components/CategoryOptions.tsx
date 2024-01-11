import Checkbox from "@/_Components/Inputs/Checkbox"
import ICategory from "@/interfaces/ICategory"


export default function CategoryOptions({
    dict,
    category,
    selectedOptions,
    setProperties
}: {
    dict: any
    category: ICategory // category with all options
    selectedOptions: number[] // IDs selected options for the Offer
    setProperties: Function
}) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let id = Number(e.target.id);

        if (selectedOptions.indexOf(id) === -1) {
            selectedOptions.push(id);
        } else {
            delete (selectedOptions[selectedOptions.indexOf(id)]);
        }

        setProperties(selectedOptions);
    }


    return (
        <div>
            <h3>{dict["category"] + ": " + (dict["cl"] == "ru" ? category.name : category.name_en)}</h3>

            <div className="flex flex-wrap">
                {category.shapes?.map(shape =>
                    <div className="2xl:w-1/4 px-2" key={shape.id}>
                        <div className="border border-gray-500 rounded-lg p-2">
                            <div className="border-b border-gray-500 mb-2">
                                {dict["cl"] == "ru" ? shape.name : shape.name_en}
                            </div>

                            {shape.shape_options?.map(option =>
                                <div className="mb-2" key={option.id}>
                                    <Checkbox
                                        id={option.id}
                                        label={dict["cl"] ? option.value : option.value_en}
                                        checked={selectedOptions?.indexOf(Number(option.id)) === -1 ? false : true}
                                        onChange={handleChange}
                                    />
                                </div>
                            )
                            }
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}