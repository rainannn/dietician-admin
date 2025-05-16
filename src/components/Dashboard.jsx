import PatientForm from './PatientForm';
import MealPlanner from './MealPlanner';
import ReportMailButton from './ReportMailButton';
import '../styles/MealPlanner.css'

export default function Dashboard({ onLogout }) {
  return (
    <div>
      <h1 className = "dashboardHeader">Diyetisyen Paneli</h1>
      <button onClick={onLogout}>Çıkış Yap</button>
      <PatientForm />
      <MealPlanner />
      <ReportMailButton />
    </div>
  );
}
