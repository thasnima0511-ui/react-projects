import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './AddStudent.css';

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rollno: '',
    name: '',
      age: '', 

    phones: [''],
    term1: { Malayalam: 0, English: 0, Science: 0, Maths: 0 },
  term2: { Malayalam: 0, English: 0, Science: 0, Maths: 0 },
  term3: { Malayalam: 0, English: 0, Science: 0, Maths: 0 },
  term4: { Malayalam: 0, English: 0, Science: 0, Maths: 0 }
    
  });

  const [inputHints, setInputHints] = useState({
    rollno: false,
    name: false,
    age: false,
    phones: [] as boolean[],
term1: { Malayalam: false, English: false, Science: false, Maths: false },
  term2: { Malayalam: false, English: false, Science: false, Maths: false },
  term3: { Malayalam: false, English: false, Science: false, Maths: false },
  term4: { Malayalam: false, English: false, Science: false, Maths: false }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value ,dataset} = e.target;
  const term = dataset.term as 'term1' | 'term2' | 'term3' | 'term4';


      if (term && ['Malayalam', 'English', 'Science', 'Maths'].includes(name)) {
    const isNumeric = /^\d*$/.test(value);
    setInputHints((prev) => ({
      ...prev,
      [term]: { ...prev[term], [name]: !isNumeric }
    }));
    if (isNumeric) {
      setFormData((prev) => ({
        ...prev,
        [term]: { ...prev[term], [name]: Number(value) }
      }));
    }
  }
    
    
    
    
    
    else if (name === 'name') {
      const isAlpha = /^[a-zA-Z\s]*$/.test(value);
      setInputHints((prev) => ({ ...prev, name: !isAlpha }));
      if (isAlpha) {
        setFormData((prev) => ({ ...prev, name: value }));
      }
    } else if (name === 'rollno') {
  const numericValue = value.replace(/\D/g, '');
  setFormData((prev) => ({ ...prev, rollno: numericValue }));
  setInputHints((prev) => ({ ...prev, rollno: numericValue.trim() === '' }));
    }
    else if (name === 'age') {
      const isNumeric = /^\d*$/.test(value);
      setInputHints((prev) => ({ ...prev, age: !isNumeric }));
      if (isNumeric) {
        setFormData((prev) => ({ ...prev, age: value }));
      }
    } else if (name === 'phones') {
      const phones = [...formData.phones];
      const index = e.target.dataset.index ? parseInt(e.target.dataset.index, 10) : -1;
      if (index >= 0) {
        phones[index] = value;
        setFormData((prev) => ({ ...prev, phones }));
        setInputHints((prev) => ({
          ...prev,
          phones: phones.map((p) => p.length !== 10)
        }));
      }
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    const phones = [...formData.phones];
    phones[index] = cleaned;

    const phoneHints = [...inputHints.phones];
    phoneHints[index] = cleaned.length !== 10;

    setFormData((prev) => ({ ...prev, phones }));
    setInputHints((prev) => ({ ...prev, phones: phoneHints }));
  };

const addPhoneField = () => {
  if (formData.phones.length < 2) {
    setFormData((prev) => ({ ...prev, phones: [...prev.phones, ''] }));
    setInputHints((prev) => ({ ...prev, phones: [...prev.phones, true] }));
  }
};
  const handleSubmit = async () => {
    if (
      formData.rollno.trim() === '' ||
      formData.name.trim() === '' ||
        formData.age.trim() === '' ||
        !/^\d+$/.test(formData.age) ||
      formData.phones.some((p) => p.length !== 10)
    ) {
      alert('Please fill all required fields correctly');
      return;
    }

    try {
      const res = await axios.post('/createStud', {
  rollno: formData.rollno.trim(),
  name: formData.name.trim(),
  age: Number(formData.age),
  phone: formData.phones.map((p) => p.trim()),
term1: formData.term1,
term2: formData.term2,
term3: formData.term3,
term4: formData.term4});

navigate('/', {
  state: {
    newStudent: res.data.user  
  }
});    } catch (err) {
      console.error('Error creating student:', err);
      alert('Failed to create student');
    }
  };

  return (
    <div className="add-student-container">
      <div className="add-student-card">
        <h2>Add New Student</h2>

        <div className="student-form-row">
          <div className="form-column">
            <div className="form-field">
              <label>Roll No</label>
              <input
                type="text"
                name="rollno"
                value={formData.rollno}
                onChange={handleInputChange}
              />
              {inputHints.rollno && <span className="input-badge">Roll no. must be numbers</span>}
            </div>

            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {inputHints.name && <span className="input-badge">Only characters</span>}
            </div>
<div className="form-field">
  <label>Age</label>
  <input
    type="text"
    name="age"
    value={formData.age}
    onChange={handleInputChange}
  />
  {inputHints.age && <span className="input-badge">Only numbers</span>}
</div>
            <div className="form-field">
              <label>Phone Numbers</label>
              <div className="phone-inputs">
                {formData.phones.map((phone, index) => (
                  <div key={index} className="form-field">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                    />
                    {inputHints.phones[index] && (
                      <span className="input-badge">Must be 10 digits</span>
                    )}
                    {index === formData.phones.length - 1 && (
                      <button
                        type="button"
                        className="add-phone-btn"
                        onClick={addPhoneField}
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-column">
            <div className="form-field">
{['term1', 'term2', 'term3', 'term4'].map((term) => (
  <div key={term}>
    <h4>{term.toUpperCase()}</h4>
    {['Malayalam', 'English', 'Science', 'Maths'].map((subject) => (
      <div className="form-field" key={subject}>
        <label>{subject}</label>
        <input
          type="text"
          name={subject}
          data-term={term}
          value={formData[term as keyof typeof formData][subject as keyof (typeof formData)[keyof typeof formData]]}
          onChange={handleInputChange}
        />
        {inputHints[term as keyof typeof inputHints] && 
         (inputHints[term as keyof typeof inputHints] as Record<string, boolean>)[subject] && (
          <span className="input-badge">Only numbers</span>
        )}
      </div>
    ))}
  </div>
))}

            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          <button className="cancel-btn" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
