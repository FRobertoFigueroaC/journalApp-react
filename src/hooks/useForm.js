import { useState, useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators()
    }, [formState])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {}

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Error de validación'] = formValidations[formField];
            const result = fn(formState[formField]);
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }
        setFormValidation(formCheckedValues)
    }

    const isFormValid = useMemo(() => {
        for (let field in formValidation) {
            if (formValidation[field] !== null) return false;
          }
          return true;
    }, [formValidation])


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        isFormValid,
        ...formValidation
    }
}