
export const validateRentalForm = (formData, setErrors) => {
    const newErrors = {
        fechaInicio: "",
        fechaFin: "",
    };

    let valid = true;
    const today = new Date();
    const fechaInicio = formData.fechaInicio
        ? new Date(formData.fechaInicio)
        : null;
    const fechaFin = formData.fechaFin ? new Date(formData.fechaFin) : null;


    if (!formData.fechaInicio) {
        newErrors.fechaInicio = "La fecha de inicio es obligatoria.";
        valid = false;
    } else if (fechaInicio < today.setHours(0, 0, 0, 0)) {
        newErrors.fechaInicio = "La fecha de inicio no puede ser anterior a hoy.";
        valid = false;
    }


    if (!formData.fechaFin) {
        newErrors.fechaFin = "La fecha de fin es obligatoria.";
        valid = false;
    } else if (fechaFin < today.setHours(0, 0, 0, 0)) {
        newErrors.fechaFin = "La fecha de fin no puede ser anterior a hoy.";
        valid = false;
    }

    if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
        newErrors.fechaFin = "La fecha de fin debe ser posterior a la de inicio.";
        valid = false;
    }

    setErrors(newErrors);
    return valid;
};
