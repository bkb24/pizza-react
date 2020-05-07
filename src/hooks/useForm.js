import { useState } from 'react'

const useForm = (initialData, validate) => {
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [submitHit, setSubmitHit] = useState(false);
    const [success] = useState(false);

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onCheckbox = e => {
        setData({ ...data, [e.target.name]: e.target.checked ? 1 : 0 })
    }

    const onFileChange = e => {
        setData({ ...data, [e.target.name]: e.target.files[0] })
    }

    const onBlur = e => {
        if (!submitHit) return;
        let validated = validate(data);
        setErrors(validated);
    }

    const hasErrors = () => {
        let validated = validate(data);
        setErrors(validated);
        return Object.keys(validated).length > 0;
    }

    return {
        data,
        errors,
        onChange,
        onBlur,
        setSubmitHit,
        setErrors,
        hasErrors,
        onCheckbox,
        onFileChange,
        success
    }
}

export default useForm
