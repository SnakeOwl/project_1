import React from 'react';

export default function FlashMessage({message}){
    return (
        <>
        {message &&
            <div className="container p-4 my-2 blue-box">
                <div className="row">
                    <div className="col-12">
                        {message}
                    </div>
                </div>
            </div>
        }
        </>
    );
}
