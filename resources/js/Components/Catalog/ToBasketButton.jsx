import React from 'react';

export default function ToBasketButton(className='', csrf_token){
    return (
        <form className={className} action="" method="post">
            <input type="hidden" name="_token" value={csrf_token} />
            <input type="hidden" name="count" value="1" />

            <button type="submit" className="bttn red">В корзину</button>
        </form>
    );
}
