import {useForm} from '@inertiajs/inertia-react';
import UserCabinetLayout from '@/Layouts/UserCabinetLayout';
import FloatInput from '@/Components/Inputs/FloatInput';
import BlueButton from '@/Components/Buttons/BlueButton';

export default function PersonalPage(props) {
    const lang = props.lang;
    const user = props.auth.user;
    const {data, setData, post} = useForm({
        phone: user.phone,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };


    const onHandeSubmit = (event) => {
        event.preventDefault();
        post( route("personal-data-update") );
    };

    return (
        <UserCabinetLayout title={lang['personal data']}>
            <h1 className="text-center">{lang['personal data']}</h1>
            <form onSubmit={onHandeSubmit}>
                <div className="row">
                    <FloatInput
                        className="col-12 col-xxl-6 mb-3"
                        labelText="id"
                        value={user.id}
                        disabled
                    />

                    <FloatInput
                        className="col-12 col-xxl-6 mb-3"
                        labelText={lang["name"]}
                        value={user.name}
                        disabled
                    />

                    <FloatInput
                        className="col-12 col-xxl-6 mb-3"
                        labelText="email"
                        value={user.email}
                        disabled
                    />

                    <FloatInput
                        className="col-12 col-xxl-6 mb-3"
                        labelText={lang["phone"]}
                        id="phone"
                        value={data.phone}
                        onHandleChange={onHandleChange}
                    />
                </div>

                <BlueButton className="w-100">{lang['submit']}</BlueButton>
            </form>
        </UserCabinetLayout>
    );
}
