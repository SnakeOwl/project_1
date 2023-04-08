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

    function onHandleSubmit (e){
        e.preventDefault();
        post(route('message-store'));
        e.target.reset();
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <MainLayout title={lang["contact form"]}>
            <div className="col-12 col-xxl-4 mx-auto">
                <h1 className="text-center">{lang["contact form h"]}</h1>
                <form className="mb-3" onSubmit={onHandleSubmit}>
                    <div className="row mb-3">
                        <FloatInput
                            id="email"
                            className="col-12 mb-3"
                            onHandleChange={onHandleChange}
                            type="email"
                            labelText="email"
                            placeholder="myEmail@gmail.com"
                            required="required"
                        />

                        <FloatTextarea
                            id="message"
                            className="col-12"
                            onHandleChange={onHandleChange}
                            value={data.message}
                            labelText={lang["message"]}
                            rows="5"
                            required="required"
                        />
                    </div>

                    <BlueButton className="w-100">{lang["submit"]}</BlueButton>
                </form>

                <p className="text-center">{lang["contact form message"]}</p>
            </div>
        </MainLayout>
    );
}
