import { useState } from "react";

// useForm functional componen
export const useForm = (callback, initialState) => {
    const [values, setValues] = useState(initialState);

    // onChange
    const onChange = (event) => {
        // console.log(event.target.name, event.target.value)
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    // onSubmit
    const onSubmit = async (event) => {
        event.preventDefault();
        await callback(); // triggering the callback
    };

    // return values
    return {
        onChange,
        onSubmit,
        values,
        setValues,
    };

}

    