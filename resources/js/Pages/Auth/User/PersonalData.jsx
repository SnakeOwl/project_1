import {useForm} from '@inertiajs/inertia-react';
import UserCabinetLayout from '@/Layouts/UserCabinetLayout';
import FloatInput from '@/Components/Inputs/FloatInput';
import BlueButton from '@/Components/Buttons/BlueButton';

export default function PersonalPage(props) {
    const lang = props.lang;
    const user = props.auth.user;
    const {data, setData, post, errors} = useForm({
        password:               "",
        password_confirmation:  "",
        phone:                  user.phone,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };


    const onHandeSubmit = (event) => {
        event.preventDefault();

        post( route("personal-data-update") );
    };

    return (
        <UserCabinetLayout title={lang['personalPage']}>
            <h1>{lang['personalData']}</h1>
            <form className="row" onSubmit={onHandeSubmit}>
                <FloatInput
                    boxClassName="col-12 col-xxl-6 mb-3"
                    labelText="id"
                    id="id"
                    value={user.id}
                    handleChange={onHandleChange}
                    disabled="1" />

                <FloatInput
                    boxClassName="col-12 col-xxl-6 mb-3"
                    labelText={lang["name"]}
                    id="name"
                    value={user.name}
                    handleChange={onHandleChange}
                    disabled="1" />

                <FloatInput
                    boxClassName="col-12 col-xxl-6 mb-3"
                    labelText="email"
                    id="email"
                    value={user.email}
                    handleChange={onHandleChange}
                    disabled="1" />

                <FloatInput
                    boxClassName="col-12 col-xxl-6 mb-3"
                    labelText={lang["phone"]}
                    id="phone"
                    value={data.phone}
                    handleChange={onHandleChange} />

                <BlueButton className="w-100">{lang['changeData']}</BlueButton>
            </form>
        </UserCabinetLayout>
    );
}
