import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react';
import GreenButton from '@/Components/Buttons/GreenButton';
import Checkbox from '@/Components/Inputs/Checkbox';

export default function Categories({
    selectedShapeOptions=[],
    onHandleSelectOptions,
    className="",
}){
    const {lang, categories, activeCategory} = usePage().props;

    const activeCategoryFilter = (activeCategory != null)
    ?
        activeCategory.shapes.map((shape)=>{

            const options = shape.shape_options.map((option)=>{
                return (
                    <li className="list-group-item">
                        <Checkbox
                            onHandleChange={onHandleSelectOptions}
                            id={option.id}
                            checked={selectedShapeOptions.includes(option.id)}
                            labelText={option.value}
                        />
                    </li>
                )
            });

            return (
                <ul className="list-group list-group-flush my-3">
                    <h6 className="fw-bold">{shape.name}</h6>
                    {options}
                </ul>
            )
        })
    : false;


    const linksOfCategories = categories.map((category)=>{
        const sCategory = (activeCategory != null)? (category.id == activeCategory.id): false;

        return(
            <li className="list-group-item">
                {!sCategory &&
                    <GreenButton
                        className="w-100 text-center rounded inverted"
                        onHandleClick={()=>Inertia.get(route('category-offers', category.alias))}
                    >
                        {category.name}
                    </GreenButton>
                }

                {sCategory &&
                    <>
                        <GreenButton
                            className="w-100 text-center"
                            href='#'
                        >
                            {category.name}
                        </GreenButton>

                        {activeCategoryFilter}
                    </>
                }
            </li>
        );
    });

    return (
        <div className={className}>
            <h5 className="text-center">{lang['categories']}</h5>
            <ul className="list-group list-group-flush">
                {linksOfCategories}
            </ul>
        </div>
    );
}
