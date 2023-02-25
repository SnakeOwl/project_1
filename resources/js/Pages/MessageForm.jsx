import { useForm, usePage } from '@inertiajs/inertia-react';
import MainLayout from '@/Layouts/MainLayout';
import FloatInput from '@/Components/Inputs/FloatInput';
import FloatTextarea from '@/Components/Inputs/FloatTextarea';
import BlueButton from '@/Components/Buttons/BlueButton';
import InputError from '@/Components/InputError';

export default function MessageForm(props){
    const { data, setData, post, errors, reset } = useForm({
            email: '',
            message: '',
            name: '',
        });

    const {lang} = usePage().props;

    function handleSubmit (e){
        e.preventDefault();
        post(route('message-store'));
        e.target.reset();
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <MainLayout title={lang["contact form"]}>
            <div className="col-12 col-xxl-6 mx-auto">
                <form className="mb-3" onSubmit={handleSubmit}>
                    <h2>{lang["contactForm"]}</h2>
                    <div className="row mb-3">
                        <FloatInput
                            id="name"
                            boxClassName="col-12 col-lg-6 mb-3"
                            handleChange={onHandleChange}
                            value={data.name}
                            labelText={lang["name"]}
                            placeholder="Viktor"
                            required="required"
                            errors={errors}
                        />

                        <FloatInput
                            id="email"
                            boxClassName="col-12 col-lg-6 mb-3"
                            handleChange={onHandleChange}
                            type="email"
                            labelText="email"
                            placeholder="myEmail@gmail.com"
                            required="required"
                            errors={errors}
                        />

                        <FloatTextarea
                            id="message"
                            boxClassName="col-12"
                            handleChange={onHandleChange}
                            value={data.message}
                            labelText={lang["message"]}
                            rows="5"
                            required="required"
                            errors={errors}
                        />
                    </div>

                    <BlueButton className="w-100">{lang["submit"]}</BlueButton>
                </form>

                <p className="text-center">{lang["contact form message"]}</p>
            </div>
        </MainLayout>
    );
}
