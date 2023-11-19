import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import bioData from '../utils/biodata';


const heights = [
    'Less than 4 fts.',
    '4-4.5 fts.',
    '4.5-5 fts.',
    '5-5.5 fts',
    '5.5-6 fts',
    '6-6.5 fts',
    'Greater than 6.5 fts.'
];
function MultiStepFilterForm() {
    const [step, setStep] = useState(1);
    const [caste, setCaste] = useState("");
    const [subcaste, setSubcaste] = useState("");
    const [gotra, setGotra] = useState("");
    const [height, setHeight] = useState("");
    const castes = Object.keys(bioData);
    const subcastes = caste ? Object.keys(bioData[caste]) : [];
    const gotras = caste && subcaste ? bioData[caste][subcaste] : [];

    const formik = useFormik({
        initialValues: {
            gender: "",
            caste: caste,
            subcaste: subcaste,
            gotra: gotra,
            manglik: "",
            height: height,
            age: "",
        },

        onSubmit: async (values) => {
            const formData = new FormData();

            for (const key in values) {
                formData.append(key, values[key]);
            }
            for (let pair of formData.entries()) {
                console.log(pair[0] + ", " + pair[1]);
            }
            try {
                const response = await fetch(
                    `http://localhost:3000/getBioDataByFilters?gender=${values.gender}&height=${values.height}&age=${values.age}&manglik=${values.manglik}&caste=${values.caste}&subcaste=${values.subcaste}&gotra=${values.gotra}`,
                    {
                        method: "GET",
                    }
                );
                const data = await response.json();
                console.log('hi');
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        },
    });

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };


    return (
        <form onSubmit={formik.handleSubmit} >
            {step === 1 && (
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        onChange={formik.handleChange}
                        value={formik.values.gender}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                </div>
            )}


            {step === 2 && (
                <div>
                    <label htmlFor="caste">Caste:</label>
                    <select
                        id="caste"
                        name="caste"
                        onChange={(e) => {
                            setCaste(e.target.value);
                            formik.setFieldValue("caste", e.target.value);
                        }}
                        value={caste}
                    >
                        <option value="">Select caste</option>
                        {castes.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>


                    <label htmlFor="subcaste">Subcaste:</label>
                    <select
                        id="subcaste"
                        name="subcaste"
                        onChange={(e) => {
                            setSubcaste(e.target.value);
                            formik.setFieldValue("subcaste", e.target.value);
                        }}
                        value={subcaste}
                    >
                        <option value="">Select subcaste</option>
                        {subcastes.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="gotra">Gotra:</label>
                    <select
                        id="gotra"
                        name="gotra"
                        onChange={(e) => {
                            setGotra(e.target.value);
                            formik.setFieldValue("gotra", e.target.value);
                        }}
                        value={gotra}
                    >
                        <option value="">Select gotra</option>
                        <option value="none">None</option>
                        {gotras.map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </select>

                </div>
            )}
            {step === 3 && (
                <div>
                    <label htmlFor="manglik">Manglik:</label>
                    <select
                        id="manglik"
                        name="manglik"
                        onChange={formik.handleChange}
                        value={formik.values.manglik}
                    >
                        <option value="">Select manglik</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="Anshik">Anshik</option>
                    </select>

                    <label htmlFor="height">Height:</label>
                    <select
                        id="height"
                        name="height"
                        onChange={(e) => {
                            setHeight(e.target.value);
                            formik.setFieldValue("height", e.target.value);
                        }}
                        value={height}
                    >
                        <option value="">Select height</option>

                        {heights.map((h) => (
                            <option key={h} value={h}>
                                {h}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="age">Age</label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    ></input>

                </div>
            )}

            {step > 1 && (
                <button type="button" onClick={prevStep}>
                    Back
                </button>
            )}
            {step < 3 && (
                <button type="button" onClick={nextStep}>
                    Next
                </button>
            )}
            {step === 3 && <button type="submit">Submit</button>}
        </form>
    );
}

export default MultiStepFilterForm;