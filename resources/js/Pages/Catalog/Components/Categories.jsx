import { usePage } from '@inertiajs/inertia-react';
import GreenLink from '@/Components/Links/GreenLink';

export default function Categories({
    values,
    onHandleChange,
    useFilter,
    className="",
}){
    const {lang, categories, activeCategory} = usePage().props;
console.log(activeCategory);
console.log(usePage().props);

    // const activeCategoryFilter = activeCategory.shapes.map((shape)=>{
    //     const options = shape.shape_options.map((option)=>{
    //
    //     });
    //
    //     return (
    //         <ul className="list-group list-group-flush">
    //
    //         </ul>
    //     );
    // });


    const linksOfCategories = categories.map((category)=>{


        const sCategory = (activeCategory != null)? (category.id == activeCategory.id): false;

        return(
            <li className="list-group-item">
                {!sCategory &&
                    <GreenLink
                        className="w-100 text-end rounded inverted"
                        href={route('category-offers', category.alias)}
                    >
                        {category.name}
                    </GreenLink>
                }

                {sCategory &&
                    <GreenLink
                        className="w-100 text-center"
                        href='#'
                    >
                        {category.name}
                    </GreenLink>
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
