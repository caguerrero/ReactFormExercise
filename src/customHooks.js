import { useState } from "react";

const useSignupForm = (schema) => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState("");
    const [manage, setManage] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const {error} = validate();
        if(!error){
            setManage(true);
            console.log("Inputs on the form ", inputs);
        } else {
            setManage(false);
            console.log("Errors ", error);
            setErrors(error);
        }
    };

    const handleInputChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const validate = () => {
        return schema.validate(inputs);
    }

    return { handleSubmit, handleInputChange, errors, manage };
};

export default useSignupForm;