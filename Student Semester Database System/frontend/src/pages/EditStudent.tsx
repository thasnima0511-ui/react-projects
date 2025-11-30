import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import axios from 'axios'; 
import './EditStudent.css';
import type { Student } from '../types';

const defaultTerm = () => ({
  Malayalam: 0,
  English: 0,
  Science: 0,
  Maths: 0,
});

type Subject = keyof ReturnType<typeof defaultTerm>;
type Term = 'term1' | 'term2' | 'term3';

const EditStudent = () => {
  const { rollno } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rollno: '',
    name: '',
    section: '',
    term1: defaultTerm(),
    term2: defaultTerm(),
    term3: defaultTerm(),
  });

  const [inputHints, setInputHints] = useState({
    name: false,
    term1: { Malayalam: false, English: false, Science: false, Maths: false },
    term2: { Malayalam: false, English: false, Science: false, Maths: false },
    term3: { Malayalam: false, English: false, Science: false, Maths: false },
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log('Fetching student for rollno:', rollno);
        const res = await axiosInstance.get<{ student: Student }>(`/getstudent/${rollno}`);
        const student = res.data?.student;

        if (!student) {
          console.error('No student found for rollno:', rollno);
          alert(`Student with rollno ${rollno} not found`);
          return;
        }

        setFormData({
          rollno: student.rollno || rollno || '',
          name: student.name || '',
          section: student.section || '',
          term1: student.term1 || defaultTerm(),
          term2: student.term2 || defaultTerm(),
          term3: student.term3 || defaultTerm(),
        });
      } catch (error) {
        console.error('Error fetching student:', error);
        alert('Failed to fetch student');
      }
    };

    if (rollno) {
      fetchStudent();
    }
  }, [rollno]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [term, subject] = name.split('.') as [Term, Subject];
      const isNumeric = /^\d*$/.test(value);

      setFormData(prev => ({
        ...prev,
        [term]: {
          ...prev[term],
          [subject]: isNumeric ? Number(value) : 0,
        },
      }));

      setInputHints(prev => ({
        ...prev,
        [term]: {
          ...prev[term],
          [subject]: !isNumeric,
        },
      }));
    } else if (name === 'name') {
      const isAlpha = /^[a-zA-Z\s]*$/.test(value);
      setInputHints(prev => ({ ...prev, name: !isAlpha }));
      if (isAlpha) setFormData(prev => ({ ...prev, name: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const allTerms = [formData.term1, formData.term2, formData.term3];
      const latestTerm = allTerms.filter(Boolean).slice(-1)[0];

      const total =
        latestTerm.Malayalam +
        latestTerm.English +
        latestTerm.Science +
        latestTerm.Maths;

      const status =
        latestTerm.Malayalam >= 35 &&
        latestTerm.English >= 35 &&
        latestTerm.Science >= 35 &&
        latestTerm.Maths >= 35
          ? 'Pass'
          : 'Fail';

      console.log('ROLLNO in formData:', formData.rollno);
      console.log('Sending update payload:', {
        ...formData,
        totalMarks: total,
        status,
      });

      const res = await axiosInstance.patch('/patchStud', {
        ...formData,
        totalMarks: total,
        status,
      });

      console.log('Update success', res.data);
      navigate('/');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error('Axios error response:', err.response?.data);
        alert('Update failed: ' + (err.response?.data?.message || 'Unknown error'));
      } else {
        console.error('Unknown error:', err);
        alert('Update failed!');
      }
    }
  };

  return (
    <div className="edit-student-page">
      <h2>Edit Student: {rollno}</h2>
      <div className="edit-form">
        <div className="edit-row">
          <div className="edit-field">
            <label>Roll No</label>
            <input type="text" name="rollno" value={formData.rollno} readOnly />
          </div>
          <div className="edit-field">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {inputHints.name && <span className="edit-input-badge">Only characters</span>}
          </div>
        </div>

        <div className="edit-row">
          <div className="edit-field-section">
            <label>Section</label>
            <input type="text" name="section" value={formData.section} onChange={handleChange} />
          </div>
        </div>

        <div className="edit-term-section">
          {(['term1', 'term2', 'term3'] as Term[]).map(term => (
            <div className="term-row" key={term}>
              <label className="term-label">{term.toUpperCase()}</label>
              <div className="term-subject-inputs">
                {(['Malayalam', 'English', 'Science', 'Maths'] as Subject[]).map(subject => (
                  <div key={`${term}.${subject}`} className="term-input-wrapper">
                    <input
                      type="text"
                      name={`${term}.${subject}`}
                      value={formData[term][subject]}
                      onChange={handleChange}
                    />
                    {inputHints[term][subject] && (
                      <span className="edit-input-badge">Only numbers</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="edit-button-group">
          <button className="edit-save-button" onClick={handleSubmit}>Save</button>
                    <button className="edit-back-button" onClick={() => navigate('/')}>Cancel</button>

        </div>
      </div>
    </div>
  );
};

export default EditStudent;
