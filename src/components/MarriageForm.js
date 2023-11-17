import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import bioData from '../utils/biodata';
import indiaStates from '../utils/indiaStates';
const data = {
  "Andhra Pradesh": [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
  ],
  "Arunachal Pradesh": [
    "Tawang",
    "West Kameng",
    "East Kameng",
    "Papum Pare",
    "Kurung Kumey",
  ],
  Bihar: [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran (Motihari)",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur (Bhabua)",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger (Monghyr)",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia (Purnea)",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],
  Chhattisgarh: [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada (South Bastar)",
    "Dhamtari",
    "Durg",
    "Gariyaband",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham (Kawardha)",
    "Kanker (North Bastar)",
    "Kondagaon",
    "Korba",
    "Korea (Koriya)",
    "Mahasamund",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sukma",
    "Surajpur",
    "Surguja",
  ],
  Goa: ["North Goa", "South Goa"],
  Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha (Palanpur)",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udepur",
    "Dahod",
    "Dangs (Ahwa)",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda (Nadiad)",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada (Rajpipla)",
    "Navsari",
    "Panchmahal (Godhra)",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha (Himmatnagar)",
    "Surat",
    "Surendranagar",
    "Tapi (Vyara)",
    "Vadodara",
    "Valsad",
  ],
  Haryana: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul &amp; Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur (Sirmour)",
    "Solan",
    "Una",
  ],
  "Jammu and Kashmir": [
    "Anantnag",
    "Bandipore",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Poonch",
    "Pulwama",
    "Rajauri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian district",
    "Srinagar",
    "Udhampur",
  ],
  Jharkhand: [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribag",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahibganj",
    "Seraikela-Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],
  Karnataka: [
    "Bagalkot",
    "Ballari (Bellary)",
    "Belagavi (Belgaum)",
    "Bengaluru (Bangalore) Rural",
    "Bengaluru (Bangalore) Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikballapur",
    "Chikkamagaluru (Chikmagalur)",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi (Gulbarga)",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru (Mysore)",
    "Raichur",
    "Ramanagara",
    "Shivamogga (Shimoga)",
    "Tumakuru (Tumkur)",
    "Udupi",
    "Uttara Kannada (Karwar)",
    "Vijayapura (Bijapur)",
    "Yadgir",
  ],
  Kerala: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ],
  Maharashtra: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],
  Manipur: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],
  Meghalaya: [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills ",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
  ],
  Mizoram: [
    "Aizawl",
    "Champhai",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Serchhip",
  ],
  Nagaland: [
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Peren",
    "Phek",
    "Tuensang",
    "Wokha",
    "Zunheboto",
  ],
  Odisha: [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghapur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar (Keonjhar)",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur (Sonepur)",
    "Sundargarh",
  ],
};


const data2= {
  baniya: {
    aggarwal: [
      "goyal",
      "bansal",
      "kucchal",
      "Kansal",
      "Jindal",
      "Mittal",
      "Tayal",
      "Bindal",
      "Singhal",
      "Garg",
      "Gupta",
    ],
    maheswari: [
      "Ajmera",
      "Asava",
      "Attal",
      "Agiwal",
      "Aagsuad",
      "Baldua",
      "Baaldi",
      "Boob",
      "Bangad",
      "Bihani",
      "Bidada",
      "Baheti",
      "Bajaj",
      "Birla",
      "Bang",
      "Bhandari",
      "Bhattad",
      "Bhutada",
    ],
    khandelwal: [],
    mahawar: [],
  },
};



const config = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJpbXRhODE5QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IldEZkxFV0hLSFVmLWNKVWI4QUV2UHlMZExqVC1uZS1YY2tDaGx2NjB5eU5xNVk0UmZJbHhNcEJQUmgzUUZuRllvdFUifSwiZXhwIjoxNzAwMzAxMDc4fQ.4UpMLd14gVPRfgF87tqLq0NgGoyMBDi1u1gOSqMRLMQ",
    Accept: "application/json",
  },
};


async function getNewToken() {
  const headers = {
    'api-token': 'WDfLEWHKHUf-cJUb8AEvPyLdLjT-ne-XckChlv60yyNq5Y4RfIlxMpBPRh3QFnFYotU',
    'user-email': 'imta819@gmail.com',
    'Accept': 'application/json',
  };

  try {
    const response = await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', { headers });
    config.headers.Authorization = `Bearer ${response.data.auth_token}`;
  } catch (error) {
    console.error('Failed to get new token:', error);
  }
}

setInterval(getNewToken, 20 * 60 * 60 * 1000);

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [caste, setCaste] = useState("");
  const [subcaste, setSubcaste] = useState("");
  const [gotra, setGotra] = useState("");

  const castes = Object.keys(bioData);
  const subcastes = caste ? Object.keys(bioData[caste]) : [];
  const gotras = caste && subcaste ? bioData[caste][subcaste] : [];


  useEffect(() => {
    if (location === "abroad") {
      axios
        .get("https://www.universal-tutorial.com/api/countries", config)
        .then((response) => {
          console.log(response.data);
          setCountries(response.data);
        })
        .catch((error) => {
          console.log("Error fetching countries: ", error);
        });
    }
  }, [location]);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://www.universal-tutorial.com/api/states/${selectedCountry}`,
          config
        )
        .then((response) => setStates(response.data));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://www.universal-tutorial.com/api/cities/${selectedState}`,
          config
        )
        .then((response) => setCities(response.data));
    }
  }, [selectedState]);

  useEffect(() => {
    if (location === "india") {
      setSelectedCountry("india");
      formik.setFieldValue("country", "india");
    }
  }, [location]);

  const formik = useFormik({
    initialValues: {
      gender: "",
      fullName: "",
      caste: caste,
      subcaste: subcaste,
      gotra: gotra,
      dob: "",
      manglik: "",
      placeOfBirth: "",
      currentAddress: "",
      location: location,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      heightFeet: "",
      complexion: "",
      education: "",
      occupation: "",
      incomeBracket: "",
      maritalStatus: "",
      pwd: "",
      file: null,
      image1: null,
      image2: null,
      phoneNumber1: "",
    },
    validationSchema: Yup.object({
      gender: Yup.string().required("Gender is required"),
      fullName: Yup.string().required("Full name is required"),
      caste: Yup.string().required("Caste is required"),
      subcaste: Yup.string().required("Subcaste is required"),
      gotra: Yup.string().required("Gotra is required"),
      dob: Yup.string().required("Date of birth is required"),
      manglik: Yup.string().required("Manglik status is required"),
      placeOfBirth: Yup.string().required("Place of birth is required"),
      currentAddress: Yup.string().required("Current address is required"),
      nativePlace: Yup.string().required("Native place is required"),
      height: Yup.string().required("Height is required"),
      complexion: Yup.string().required("Complexion is required"),
      education: Yup.string().required("Education is required"),
      occupation: Yup.string().required("Occupation is required"),
      incomeBracket: Yup.string().required("Income bracket is required"),
      maritalStatus: Yup.string().required("Marital status is required"),
      pwd: Yup.string().required("PWD status is required"),
      file: Yup.mixed().required("File upload is required"),
      phoneNumber1: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Invalid phone number"),
      phoneNumber2: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Invalid phone number"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    }),
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
          "http://localhost:3000/postMarriageDetails",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
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
          {formik.errors.gender && formik.touched.gender && (
            <div>{formik.errors.gender}</div>
          )}
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
          {formik.errors.fullName && formik.touched.fullName && (
            <div>{formik.errors.fullName}</div>
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
              {formik.errors.caste && formik.touched.caste && (
                <div>{formik.errors.caste}</div>
              )}

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
              {formik.errors.subcaste && formik.touched.subcaste && (
                <div>{formik.errors.subcaste}</div>
              )}

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
                {gotras.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {formik.errors.gotra && formik.touched.gotra && (
                <div>{formik.errors.gotra}</div>
              )}
            </div>
          )}

          <label htmlFor="dob">Date of Birth:</label>
          <input
            id="dob"
            name="dob"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.dob}
          />
          {formik.errors.dob && formik.touched.dob && (
            <div>{formik.errors.dob}</div>
          )}
          <label htmlFor="manglik">Manglik:</label>
          <div>
            <input
              id="manglik-yes"
              name="manglik"
              type="radio"
              value="yes"
              onChange={formik.handleChange}
              checked={formik.values.manglik === "yes"}
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
              checked={formik.values.manglik === "no"}
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
              checked={formik.values.manglik === "anshik"}
            />
            <label htmlFor="manglik-anshik">Anshik</label>
          </div>
          {formik.errors.manglik && formik.touched.manglik && (
            <div>{formik.errors.manglik}</div>
          )}
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
          {formik.errors.placeOfBirth && formik.touched.placeOfBirth && (
            <div>{formik.errors.placeOfBirth}</div>
          )}
          <label htmlFor="currentAddress">Current Address:</label>
          <input
            id="currentAddress"
            name="currentAddress"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.currentAddress}
          />
          {formik.errors.currentAddress && formik.touched.currentAddress && (
            <div>{formik.errors.currentAddress}</div>
          )}
          <label htmlFor="location">Address:</label>
          <select
            id="location"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
              formik.setFieldValue("location", e.target.value);
            }}
          >
            <option value="">Select Location</option>
            <option value="india">India</option>
            <option value="abroad">Abroad</option>
          </select>
          {formik.errors.location && formik.touched.location && (
            <div>{formik.errors.location}</div>
          )}

          {location === "abroad" && (
            <>
              <label htmlFor="country">Country:</label>
              <select
                id="country"
                name="country"
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  formik.setFieldValue("country", e.target.value);
                }}
                value={selectedCountry}
              >
                {countries.map((country) => (
                  <option
                    key={country.country_name}
                    value={country.country_name}
                  >
                    {country.country_name}
                  </option>
                ))}
              </select>
              {formik.errors.country && formik.touched.country && (
                <div>{formik.errors.country}</div>
              )
              }

              <label htmlFor="state">State:</label>
              <select
                id="state"
                name="state"
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  formik.setFieldValue("state", e.target.value);
                }}
                value={selectedCountry}
              >
                {states.map((state) => (
                  <option key={state.state_name} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </select>
              {formik.errors.state && formik.touched.state && (
                <div>{formik.errors.state}</div>
              )}

              <label htmlFor="city">City:</label>
              <select
                id="city"
                name="city"
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  formik.setFieldValue("city", e.target.value);
                }}
                value={selectedCity}
              >
                {cities.map((city) => (
                  <option key={city.city_name} value={city.city_name}>
                    {city.city_name}
                  </option>
                ))}
              </select>
              {formik.errors.city && formik.touched.city && (
                <div>{formik.errors.city}</div>
              )}
            </>
          )}

          {location === "india" && (
            <>
              <label htmlFor="state">State:</label>
              <select
                id="state"
                name="state"
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  formik.setFieldValue("state", e.target.value);
                }}
              >
                <option value="">Select a state</option>
                {Object.keys(indiaStates).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {formik.errors.state && formik.touched.state && (
                <div>{formik.errors.state}</div>
              )}
              <label htmlFor="district">City</label>
              <select
                id="city"
                name="city"
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  formik.setFieldValue("city", e.target.value);
                }}
              >
                <option value="">Select a City</option>
                {selectedState &&
                  indiaStates[selectedState].map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
              {formik.errors.city && formik.touched.city && (
                <div>{formik.errors.city}</div>
              )}
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
          {formik.errors.heightFeet && formik.touched.heightFeet && (
            <div>{formik.errors.heightFeet}</div>
          )}
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
          {formik.errors.complexion && formik.touched.complexion && (
            <div>{formik.errors.complexion}</div>
          )}
          <label htmlFor="education">Education:</label>
          <input
            id="education"
            name="education"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.education}
          />
          {formik.errors.education && formik.touched.education && (
            <div>{formik.errors.education}</div>
          )}
          <label htmlFor="occupation">Occupation:</label>
          <input
            id="occupation"
            name="occupation"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.occupation}
          />
          {formik.errors.occupation && formik.touched.occupation && (
            <div>{formik.errors.occupation}</div>

          )}
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
              checked={formik.values.maritalStatus === "single"}
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
              checked={formik.values.maritalStatus === "divorced"}
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
              checked={formik.values.maritalStatus === "married"}
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
              checked={formik.values.pwd === "yes"}
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
              checked={formik.values.pwd === "no"}
            />
            <label htmlFor="pwd-no">No</label>
          </div>
          <label htmlFor="file">Upload File:</label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("file", event.currentTarget.files[0]);
            }}
          />
          <label htmlFor="image1">Upload Image 1:</label>
          <input
            id="image1"
            name="image1"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("image1", event.currentTarget.files[0]);
            }}
          />
          <label htmlFor="image2">Upload Image 2:</label>
          <input
            id="image2"
            name="image2"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("image2", event.currentTarget.files[0]);
            }}
          />
          <label htmlFor="image3">Upload Image 3:</label>
          <input
            id="image3"
            name="image3"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("image3", event.currentTarget.files[0]);
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
      {step > 1 && (
        <button type="button" onClick={prevStep}>
          Back
        </button>
      )}
      {step < 4 && (
        <button type="button" onClick={nextStep}>
          Next
        </button>
      )}
      {step === 4 && <button type="submit">Submit</button>}
    </form>
  );
}

export default MultiStepForm;
