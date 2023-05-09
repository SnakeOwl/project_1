import { useContext } from 'react';
import ContextGlobal from '/src/context/Global/ContextGlobal';
import {GreenButton} from '/src/Components/Buttons';
import {Checkbox} from '/src/Components/Inputs/Inputs';
import { GreenLink } from '/src/Components/Links';

export default function Categories({
    categories, 
    activeCategory, 
    availableOptions,
    selectedOptions=[],
    onHandleSelectOptions,
    className="",
}){
    const {stateGlobal} = useContext(ContextGlobal);
    const {lang, currentLocale} = stateGlobal;

    const activeCategoryFilter = (activeCategory != null)
    ?
        activeCategory.shapes.map((shape)=>{
            const options = shape.shape_options.map((option)=>{
                return (
                    <li 
                        key={`option-${option.id}`}
                        className="list-group-item d-flex justify-content-between align-items-center group-item-action"
                    >
                        <Checkbox
                            onHandleChange={onHandleSelectOptions}
                            id={option.id}
                            checked={selectedOptions.includes(option.id)}
                            labelText={currentLocale=="en"? option.value_en: option.value}
                            disabled={ availableOptions[option.id] == undefined }
                        />

                        { (availableOptions[option.id] !== undefined) &&
                            <span className="badge bg-primary rounded-pill">{availableOptions[option.id]}</span>
                        }
                    </li>
                );
            });

            return (
                <ul key={`shape-${shape.id}`} className="list-group list-group-flush my-3">
                    <h6 className="fw-bold">{currentLocale=="en"? shape.name_en: shape.name}</h6>
                    {options}
                </ul>
            )
        })
    : false;

    const linksOfCategories = categories.map((category)=>{
        const sCategory = (activeCategory != null)? (category.id == activeCategory.id): false;

        return(
            <li key={`category-${category.id}`} className="list-group-item">
                {!sCategory &&
                    <GreenLink
                        className="w-100 text-center rounded inverted"
                        to={`/${category.alias}`}
                    >
                        {category.name}
                    </GreenLink>
                }

                {sCategory &&
                    <>
                        <GreenButton className="w-100 text-center">
                            {currentLocale=="en"? category.name_en: category.name}
                        </GreenButton>

                        {activeCategoryFilter}
                    </>
                }
            </li>
        );
    });

    return (
        <div className={className}>
            <h5 className="text-center mb-0">{lang['categories']}</h5>
            <ul className="list-group list-group-flush">
                {linksOfCategories}
            </ul>
        </div>
    );
}
