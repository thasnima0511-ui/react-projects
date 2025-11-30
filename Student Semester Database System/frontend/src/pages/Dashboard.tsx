import { useEffect, useState } from 'react';
import axios from '../api/axios';
import type { Student } from '../types';
import './Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';

type DashboardStudent = Student & {
  status: 'Pass' | 'Fail';
  totalMarks: number;
};

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [students, setStudents] = useState<DashboardStudent[]>([]);
  const [selectedRollNo, setSelectedRollNo] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Rank by Marks');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const isActive = (path: string) => location.pathname === path;

  const getLatestTerm = (student: Student) => {
    if (student.term3) return student.term3;
    if (student.term2) return student.term2;
    if (student.term1) return student.term1;
    return null;
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get<{ users: Student[] }>('/getStud');
      const processed = res.data.users.map((student) => {
        const latestTerm = getLatestTerm(student);
        let isPass = false;
        let total = 0;
        if (latestTerm) {
          const { Malayalam = 0, English = 0, Science = 0, Maths = 0 } = latestTerm;
          isPass = Malayalam >= 35 && English >= 35 && Science >= 35 && Maths >= 35;
          total = Malayalam + English + Science + Maths;
        }

        return {
          ...student,
          status: isPass ? 'Pass' as const : 'Fail' as const,
          totalMarks: total,
        };
      });
      setStudents(processed);
    } catch (err) {
      console.error("Token may be invalid. Logging out.");
      onLogout();
    }
  };

  const handleDeleteClick = (rollno: string) => {
    setSelectedRollNo(rollno);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedRollNo) {
      await axios.delete(`/deleteStud?rollno=${selectedRollNo}`);
      setShowModal(false);
      setSelectedRollNo(null);
      fetchStudents();
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedRollNo(null);
  };

  useEffect(() => {
    fetchStudents();
  }, [onLogout]);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollno.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortOption) {
      case 'Name A-Z':
        return a.name.localeCompare(b.name);
      case 'Name Z-A':
        return b.name.localeCompare(a.name);
      case 'Roll No ↑':
        return a.rollno.localeCompare(b.rollno);
      case 'Roll No ↓':
        return b.rollno.localeCompare(a.rollno);
      case 'Rank by Marks':
      default:
        return b.totalMarks - a.totalMarks;
    }
  });

  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="dashboard-wrapper gradient-bg">
      <div className="sidebar glass">
        <h3>Menu</h3>
        <ul>
          <li
            className={isActive('/') ? 'active neon-border' : ''}
            onClick={() => navigate('/')}
          >
            Dashboard
          </li>
          <li
            className={isActive('/assessment') ? 'active neon-border' : ''}
            onClick={() => navigate('/assessment')}
          >
            Assessment
          </li>
        </ul>

        <div className="logout-box" onClick={onLogout}>
          Logout
        </div>
      </div>

      <div className="dashboard">
 {/* add student */}

        <h2>All Students</h2>

        <div className="student-table glass">
          <div className="dashboard-filter">
            <input
              type="text"
              placeholder="Search by name or roll"
              className="filter-search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <div className="filter-sort">
              <label htmlFor="sortBy">Sort by : </label>
              <select
                id="sortBy"
                className="sort-dropdown"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>Rank by Marks</option>
                <option>Name A-Z</option>
                <option>Name Z-A</option>
                <option>Roll No ↑</option>
                <option>Roll No ↓</option>
              </select>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll&nbsp;No</th>
                <th>Section</th>
                <th>Total Marks</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((s) => (
                <tr key={s.rollno} className="glass-row">
                  <td>{s.name}</td>
                  <td>{s.rollno}</td>
                  <td>{s.section}</td>
                  <td>{s.totalMarks ?? '-'}</td>
                  <td>
                    <span className={s.status === 'Fail' ? 'fail' : 'pass'}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <span
                        className="material-icons delete-icon"
                        title="Edit"
                        onClick={() => navigate(`/edit/${s.rollno}`)}
                      >
                        edit
                      </span>
                      <span
                        className="material-icons delete-icon"
                        title="Delete"
                        onClick={() => handleDeleteClick(s.rollno)}
                      >
                        delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal glass">
              <h3>Are you sure?</h3>
              <p>This will delete the student record.</p>
              <div className="modal-buttons">
                <button className="confirm" onClick={confirmDelete}>Yes</button>
                <button className="cancel" onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
