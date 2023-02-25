<?php

Route::get('/test', function(){
    dd(
        config('storage.default_image_path')
        ,"Ok"
    );
});
