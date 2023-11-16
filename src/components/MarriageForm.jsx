import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [location, setLocation] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJpbXRhODE5QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IldEZkxFV0hLSFVmLWNKVWI4QUV2UHlMZExqVC1uZS1YY2tDaGx2NjB5eU5xNVk0UmZJbHhNcEJQUmgzUUZuRllvdFUifSwiZXhwIjoxNzAwMjEyODA1fQ.aRE8XVJNSDnOmdtUAkwG15FOlJClq9m44SMQ7waWitQ",
                'Accept': 'application/json'
            }
        };
        if (location === 'abroad') {
            axios.get('https://www.universal-tutorial.com/api/countries', config)
                .then(response => {
                    console.log(response.data);
                    setCountries(response.data);
                })
                .catch(error => {
                    console.log('Error fetching countries: ', error);
                });

        }
    }, [location]);

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJpbXRhODE5QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IldEZkxFV0hLSFVmLWNKVWI4QUV2UHlMZExqVC1uZS1YY2tDaGx2NjB5eU5xNVk0UmZJbHhNcEJQUmgzUUZuRllvdFUifSwiZXhwIjoxNzAwMjEyODA1fQ.aRE8XVJNSDnOmdtUAkwG15FOlJClq9m44SMQ7waWitQ",
                'Accept': 'application/json'
            }
        };
        if (selectedCountry) {
            axios.get(`https://www.universal-tutorial.com/api/states/${selectedCountry}`, config)
                .then(response => setStates(response.data));
        }
    }, [selectedCountry]);

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJpbXRhODE5QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IldEZkxFV0hLSFVmLWNKVWI4QUV2UHlMZExqVC1uZS1YY2tDaGx2NjB5eU5xNVk0UmZJbHhNcEJQUmgzUUZuRllvdFUifSwiZXhwIjoxNzAwMjEyODA1fQ.aRE8XVJNSDnOmdtUAkwG15FOlJClq9m44SMQ7waWitQ",
                'Accept': 'application/json'
            }
        };
        if (selectedState) {
            axios.get(`https://www.universal-tutorial.com/api/cities/${selectedState}`, config)
                .then(response => setCities(response.data));
        }
    }, [selectedState]);

    const formik = useFormik({
        initialValues: {
            gender: '',
            fullName: '',
            caste: '',
            subcaste: '',
            gotra: '',
            dob: '',
            manglik: '',
            placeOfBirth: '',
            currentAddress: '',
            nativePlace: '',
            heightFeet: '',
            complexion: '',
            education: '',
            occupation: '',
            incomeBracket: '',
            maritalStatus: '',
            pwd: '',
            file: null,
            image1: null,
            image2: null,
            phoneNumber1: '',
            phoneNumber2: '',
            email: '',
        },

        onSubmit: async (values) => {
            const formData = new FormData();

            for (const key in values) {
                formData.append(key, values[key]);
            }
            try {
                const response = await fetch('http://localhost:3000/postMarriageDetails', {
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'multipart/form-data'
                    // },
                    body: formData
                });
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                //   }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    });
    const validationSchema = Yup.object({
        gender: Yup.string().required('Gender is required'),
        fullName: Yup.string().required('Full name is required'),
        caste: Yup.string().required('Caste is required'),
        subcaste: Yup.string().required('Subcaste is required'),
        gotra: Yup.string().required('Gotra is required'),
        dob: Yup.string().required('Date of birth is required'),
        manglik: Yup.string().required('Manglik status is required'),
        placeOfBirth: Yup.string().required('Place of birth is required'),
        currentAddress: Yup.string().required('Current address is required'),
        nativePlace: Yup.string().required('Native place is required'),
        height: Yup.string().required('Height is required'),
        complexion: Yup.string().required('Complexion is required'),
        education: Yup.string().required('Education is required'),
        occupation: Yup.string().required('Occupation is required'),
        incomeBracket: Yup.string().required('Income bracket is required'),
        maritalStatus: Yup.string().required('Marital status is required'),
        pwd: Yup.string().required('PWD status is required'),
        file: Yup.mixed().required('File upload is required'),
        phoneNumber1: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]{10}$/, 'Invalid phone number'),
        phoneNumber2: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]{10}$/, 'Invalid phone number'),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
    });
    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    return (

        <form onSubmit={formik.handleSubmit} validationSchema={validationSchema} >
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
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                    />
                    <label htmlFor="caste">Caste:</label>
                    <input
                        id="caste"
                        name="caste"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.caste}
                    />
                    <label htmlFor="subcaste">Subcaste:</label>
                    <input
                        id="subcaste"
                        name="subcaste"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.subcaste}
                    />
                    <label htmlFor="gotra">Gotra:</label>
                    <input
                        id="gotra"
                        name="gotra"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.gotra}
                    />
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        id="dob"
                        name="dob"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.dob}
                    />
                    <label htmlFor="manglik">Manglik:</label>
                    <div>
                        <input
                            id="manglik-yes"
                            name="manglik"
                            type="radio"
                            value="yes"
                            onChange={formik.handleChange}
                            checked={formik.values.manglik === 'yes'}
                        />
                        <label htmlFor="manglik-yes">Yes</label>
                    </div>
                    <div>
                        <input
                            id="manglik-no"
                            name="manglik"
                            type="radio"
                            value="no"
                            onChange={formik.handleChange}
                            checked={formik.values.manglik === 'no'}
                        />
                        <label htmlFor="manglik-no">No</label>
                    </div>
                    <div>
                        <input
                            id="manglik-anshik"
                            name="manglik"
                            type="radio"
                            value="anshik"
                            onChange={formik.handleChange}
                            checked={formik.values.manglik === 'anshik'}
                        />
                        <label htmlFor="manglik-anshik">Anshik</label>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div>
                    <label htmlFor="placeOfBirth">Place of Birth:</label>
                    <input
                        id="placeOfBirth"
                        name="placeOfBirth"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.placeOfBirth}
                    />
                    <label htmlFor="currentAddress">Current Address:</label>
                    <input
                        id="currentAddress"
                        name="currentAddress"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.currentAddress}
                    />
                    {/* <label htmlFor="nativePlace">Native Place:</label>
                    <input
                        id="nativePlace"
                        name="nativePlace"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.nativePlace}
                    /> */}

                    <label htmlFor="location">Location:</label>
                    <select id="location" name="location" onChange={e => setLocation(e.target.value)}>
                        <option value="">Select Location</option>
                        <option value="india">India</option>
                        <option value="abroad">Abroad</option>
                    </select>

                    {location === 'abroad' && (
                        <>
                            <label htmlFor="country">Country:</label>
                            {/* <select id="country" name="country" onChange={e => setSelectedCountry(e.target.value)}>
                                <option value="">Select Country</option>
                                {countries.map(country => <option key={country} value={country}>{country}</option>)}
                            </select> */}
                            <select id="country" name="country" onChange={e => setSelectedCountry(e.target.value)}>
                                {countries.map(country => (
                                    <option key={country.country_name} value={country.country_name}>
                                        {country.country_name}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="state">State:</label>
                            {/* <select id="state" name="state" onChange={e => setSelectedState(e.target.value)}>
                                <option value="">Select State</option>
                                {states.map(state => <option key={state} value={state}>{state}</option>)}
                            </select> */}
                            <select id="state" name="state" onChange={e => setSelectedState(e.target.value)}>
                                {states.map(state => (
                                    <option key={state.state_name} value={state.state_name}>
                                        {state.state_name}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="city">City:</label>
                            <select id="city" name="city">
                                {cities.map(city => (
                                    <option key={city.city_name} value={city.city_name}>
                                        {city.city_name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                </div>



            )}
            {step === 4 && (
                <div>
                    <label htmlFor="heightFeet">Height (in feet):</label>
                    <input
                        id="heightFeet"
                        name="heightFeet"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.heightFeet}
                    />
                    <label htmlFor="complexion">Complexion:</label>
                    <select
                        id="complexion"
                        name="complexion"
                        onChange={formik.handleChange}
                        value={formik.values.complexion}
                    >
                        <option value="">Select Complexion</option>
                        <option value="fair">Fair</option>
                        <option value="medium">Medium</option>
                        <option value="dark">Dark</option>
                    </select>
                    <label htmlFor="education">Education:</label>
                    <input
                        id="education"
                        name="education"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.education}
                    />
                    <label htmlFor="occupation">Occupation:</label>
                    <input
                        id="occupation"
                        name="occupation"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.occupation}
                    />
                    <label htmlFor="incomeBracket">Income Bracket:</label>
                    <select
                        id="incomeBracket"
                        name="incomeBracket"
                        onChange={formik.handleChange}
                        value={formik.values.incomeBracket}
                    >
                        <option value="">Select Income Bracket</option>
                        <option value="less than 1 lakh">Less than 1 Lakh</option>
                        <option value="1-5 lakhs">1-5 Lakhs</option>
                        <option value="5-10 lakhs">5-10 Lakhs</option>
                        <option value="more than 10 lakhs">More than 10 Lakhs</option>
                    </select>

                    <label htmlFor="maritalStatus">Marital Status:</label>
                    <div>
                        <input
                            id="single"
                            name="maritalStatus"
                            type="radio"
                            value="single"
                            onChange={formik.handleChange}
                            checked={formik.values.maritalStatus === 'single'}
                        />
                        <label htmlFor="single">Single</label>
                    </div>
                    <div>
                        <input
                            id="divorced"
                            name="maritalStatus"
                            type="radio"
                            value="divorced"
                            onChange={formik.handleChange}
                            checked={formik.values.maritalStatus === 'divorced'}
                        />
                        <label htmlFor="divorced">Divorced</label>
                    </div>
                    <div>
                        <input
                            id="married"
                            name="maritalStatus"
                            type="radio"
                            value="married"
                            onChange={formik.handleChange}
                            checked={formik.values.maritalStatus === 'married'}
                        />
                        <label htmlFor="married">Married</label>
                    </div>
                    <label htmlFor="pwd">PwD:</label>
                    <div>
                        <input
                            id="pwd-yes"
                            name="pwd"
                            type="radio"
                            value="yes"
                            onChange={formik.handleChange}
                            checked={formik.values.pwd === 'yes'}
                        />
                        <label htmlFor="pwd-yes">Yes</label>
                    </div>
                    <div>
                        <input
                            id="pwd-no"
                            name="pwd"
                            type="radio"
                            value="no"
                            onChange={formik.handleChange}
                            checked={formik.values.pwd === 'no'}
                        />
                        <label htmlFor="pwd-no">No</label>
                    </div>
                    <label htmlFor="file">Upload File:</label>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={(event) => {
                            formik.setFieldValue('file', event.currentTarget.files[0]);
                        }}
                    />
                    <label htmlFor="image1">Upload Image 1:</label>
                    <input
                        id="image1"
                        name="image1"
                        type="file"
                        onChange={(event) => {
                            formik.setFieldValue('image1', event.currentTarget.files[0]);
                        }}
                    />
                    <label htmlFor="image2">Upload Image 2:</label>
                    <input
                        id="image2"
                        name="image2"
                        type="file"
                        onChange={(event) => {
                            formik.setFieldValue('image2', event.currentTarget.files[0]);
                        }}
                    />
                    <label htmlFor="image3">Upload Image 3:</label>
                    <input
                        id="image3"
                        name="image3"
                        type="file"
                        onChange={(event) => {
                            formik.setFieldValue('image3', event.currentTarget.files[0]);
                        }}
                    />
                    <label htmlFor="phoneNumber1">Phone Number 1:</label>
                    <input
                        id="phoneNumber1"
                        name="phoneNumber1"
                        type="tel"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber1}
                    />
                    <label htmlFor="phoneNumber2">Phone Number 2:</label>
                    <input
                        id="phoneNumber2"
                        name="phoneNumber2"
                        type="tel"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber2}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
            )}
            {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
            {step < 4 && <button type="button" onClick={nextStep}>Next</button>}
            {step === 4 && <button type="submit">Submit</button>}
        </form>
    );
}

export default MultiStepForm;