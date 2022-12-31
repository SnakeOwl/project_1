import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import FloatInput from '@/Components/Inputs/FloatInput';
import FloatTextarea from '@/Components/Inputs/FloatTextarea';
import BlueButton from '@/Components/Buttons/BlueButton';
import { useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/InputError';

export default function MessageForm(props){
    const { data, setData, post, errors, reset } = useForm({
            email: '',
            message: '',
            name: '',
        });

    function handleSubmit (e){
        e.preventDefault();
        post(route('message-store'));
        e.target.reset();
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <MainLayout
            flash={props.flash}
            title="Связь с администрацией"
            auth={props.auth}
            >
            <div className="col-12 col-lg-6 mx-auto">
                <form className="mb-3" onSubmit={handleSubmit}>
                    <input type="hidden" name="_token" value={props.csrf_token} />
                        <h2>Форма связи с администрацией</h2>
                        <div className="row mb-3">
                            <div className="col-12 col-lg-6">

                                <FloatInput
                                    handleChange={onHandleChange}
                                    type="text"
                                    value={data.name}
                                    id="name"
                                    labelText="Ваше имя"
                                    placeholder="Виктор"
                                    required="required"
                                    errors={errors}
                                />
                            </div>

                            <div className="col-12 col-lg-6">
                                <FloatInput
                                    handleChange={onHandleChange}
                                    type="email"
                                    id="email"
                                    labelText="Ваш email"
                                    placeholder="myEmail@gmail.com"
                                    required="required"
                                    errors={errors}
                                />
                            </div>

                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <FloatTextarea
                                    handleChange={onHandleChange}
                                    value={data.message}
                                    id="message"
                                    labelText="Сообщение"
                                    rows="5"
                                    required="required"
                                    errors={errors}    
                                />

                            </div>
                        </div>
                        <BlueButton className="w-100">Отправить</BlueButton>
                </form>
                <p>Напишите нам письмо и мы вам ответим!</p>
            </div>
        </MainLayout>
    );
}
