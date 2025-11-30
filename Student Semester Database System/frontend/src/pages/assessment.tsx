import { useEffect, useState } from 'react';
import './Assessment.css';

type Subject = 'Malayalam' | 'English' | 'Science' | 'Maths';

type PassData = {
  [term: string]: {
    [subject in Subject]: number;
  };
};

const Assessment = () => {
  const [topTerm1, setTopTerm1] = useState<{ name: string; total: number }[]>([]);
  const [topTerm2, setTopTerm2] = useState<{ name: string; total: number }[]>([]);
  const [topTerm3, setTopTerm3] = useState<{ name: string; total: number }[]>([]);

  const [subjectTopPerformers, setSubjectTopPerformers] = useState<{
    [term: string]: {
      [subject in Subject]?: { name: string; score: number };
    };
  }>({});

  useEffect(() => {
    const fetchTopPerformers = async () => {
      try {
        const token = localStorage.getItem('token');

        const fetchTerm = async (term: string) => {
          const res = await fetch(`http://localhost:3000/Login/top-${term}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          return (data.topPerformers || []).sort(
            (a: { name: string; total: number }, b: { name: string; total: number }) =>
              b.total - a.total
          );
        };

        const [t1, t2, t3] = await Promise.all([
          fetchTerm('term1'),
          fetchTerm('term2'),
          fetchTerm('term3'),
        ]);

        setTopTerm1(t1);
        setTopTerm2(t2);
        setTopTerm3(t3);

        const computeSubjectToppers = (termData: any[]): {
          [subject in Subject]?: { name: string; score: number };
        } => {
          const subjects: Subject[] = ['Malayalam', 'English', 'Science', 'Maths'];
          const toppers: { [subject in Subject]?: { name: string; score: number } } = {};
          subjects.forEach((subject) => {
            const top = [...termData].sort((a, b) => b[subject] - a[subject])[0];
            if (top && top[subject] !== undefined) {
              toppers[subject] = { name: top.name, score: top[subject] };
            }
          });
          return toppers;
        };

        setSubjectTopPerformers({
          term1: computeSubjectToppers(t1),
          term2: computeSubjectToppers(t2),
          term3: computeSubjectToppers(t3),
        });
      } catch (err) {
        console.error('Failed to fetch top students:', err);
      }
    };

    fetchTopPerformers();
  }, []);

  const [passData, setPassData] = useState<PassData>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/Login/pass-percentage', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPassData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
     <div className="assessment-page">
    <div className="assessment-container" style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 2 }}>
        {/* Term Assessment */}
        <div className="assessment-card large">
          <h3>Term Assessment</h3>
          <div className="bar-charts">
            {[
              { label: 'Term 1', data: topTerm1 },
              { label: 'Term 2', data: topTerm2 },
              { label: 'Term 3', data: topTerm3 },
            ].map((term, idx) => (
              <div className="bar-group" key={term.label}>
                <div className="term-bars">
                  {term.data.map((student) => {
                    const percentage = (student.total / 400) * 100;
                    return (
                      <div className="bar" key={student.name}>
                        <div
                          className={`bar-fill bar-${idx + 1}`}
                          style={{ height: `${percentage}%` }}
                          title={`${student.name}: ${student.total}`}
                        ></div>
                        <p className="student-name">{student.name}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="bar-label">{term.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Semester Overall Percentage */}
        <div className="assessment-card large">
          <h3>Semester Overall Percentage</h3>
          <div className="term-validation">
            {[1, 2, 3].map((term) => {
              const termKey = `term${term}`;
              const data = passData[termKey] || {};

              return (
                <div className="term-box" key={term}>
                  <p>
                    <strong>Term {term}</strong>
                  </p>

                  <p>Malayalam - {data['Malayalam']?.toFixed(1) || 0}%</p>
                  <div
                    className="progress speaking"
                    style={{ width: `${data['Malayalam'] || 0}%` }}
                  ></div>

                  <p>English - {data['English']?.toFixed(1) || 0}%</p>
                  <div
                    className="progress reading"
                    style={{ width: `${data['English'] || 0}%` }}
                  ></div>

                  <p>Science - {data['Science']?.toFixed(1) || 0}%</p>
                  <div
                    className="progress comprehension1"
                    style={{ width: `${data['Science'] || 0}%` }}
                  ></div>

                  <p>Maths - {data['Maths']?.toFixed(1) || 0}%</p>
                  <div
                    className="progress comprehension2"
                    style={{ width: `${data['Maths'] || 0}%` }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

{/* Right Column: Top Performer */}
<div style={{ flex: 1 }}>
  <div className="top-performers-wrapper">
    <div className="top-performers">
      <div className="top-performer-header">
        <h3 className="top-performer-heading">Top Performers</h3>
      </div>

      {[1, 2, 3].map((term) => {
        const termKey = `term${term}`;
        return (
          <div className="assessment-card small" key={term}>
            <h4 className="term-heading">Term {term}</h4>
            <div className="performer-cards">
              {['Malayalam', 'English', 'Science', 'Maths'].map((skill) => {
                const topper = subjectTopPerformers[termKey]?.[skill as Subject];

                // const rankBadge = index === 0
                //   ? <span className="rank-badge gold">1st</span>
                //   : index === 1
                //   ? <span className="rank-badge silver">2nd</span>
                //   : index === 2
                //   ? <span className="rank-badge bronze">3rd</span>
                //   : null;

                return (
                  <div className="performer-box" key={skill}>
                    {/* Badge for top performers */}
                    <p className="skill">
                     <span className="badge-subject">🏆</span></p> {skill}
                    <p className="para-name">{topper?.name || '—'}</p>
                    <p className="score">Score: {topper?.score ?? '--'}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>

    </div>
    </div>
  );
};

export default Assessment;
