import { useEffect, useState } from 'react';
import '../styles/PatientForm.css';

export default function PatientForm() {
  const [patientList, setPatientList] = useState([{ name: '', age: '', height: '', weight: '' }]);
  const [patient, setPatient] = useState({ name: '', age: '', height: '', weight: '' });

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/slcbdmb4n0ps2") // Buraya kendi SheetDB API linkini koy
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setPatientList(data);
          const firstPatient = data[0];
          setPatient(firstPatient);
        }
      })
      .catch(err => console.error("Veri alınamadı:", err));
  }, []);

  const handleClick = (patient) => {
    setPatient(patient);
  }

  return (
    <div className="main-patient-form">
      <h3>Danışan Bilgileri</h3>
      {patientList.map((patient, index) => (
        <button
          key={index}
          onClick={() => handleClick(patient)}
        >
          {patient.name}
        </button>
      ))}
      <input value={patient.name} placeholder="Ad Soyad" onChange={e => setPatient({ ...patient, name: e.target.value })} />
      <input value={patient.age} type="number" placeholder="Yaş" onChange={e => setPatient({ ...patient, age: e.target.value })} />
      <input value={patient.height} type="number" placeholder="Boy (cm)" onChange={e => setPatient({ ...patient, height: e.target.value })} />
      <input value={patient.weight} type="number" placeholder="Kilo (kg)" onChange={e => setPatient({ ...patient, weight: e.target.value })} />
    </div>
  );
}
