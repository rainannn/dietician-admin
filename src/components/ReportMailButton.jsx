import { useState } from 'react';
import '../styles/ReportMailButton.css';

export default function ReportMailButton({ meals }) {
  const [email, setEmail] = useState('');

  const handleMail = () => {
    if (!email) {
      alert("Lütfen danışan e-posta adresini girin.");
      return;
    }

    
    const mealNames = { breakfast: 'Kahvaltı', lunch: 'Öğle', dinner: 'Akşam' };
    let mailContent = 'Danışanın Öğün Detayları:\n\n';

    for (const meal in meals) {
      mailContent += `${mealNames[meal]}:\n`;
      if (meals[meal].length === 0) {
        mailContent += '  - Öğün boş\n';
      } else {
        meals[meal].forEach(item => {
          mailContent += `  - ${item.name} (${item.calories} cal)\n`;
        });
      }
      mailContent += '\n';
    }

    alert(`Rapor ${email} adresine gönderildi (simülasyon):\n\n${mailContent}`);
  };

  return (
    <form className="report-mail-form" onSubmit={e => { e.preventDefault(); handleMail(); }}>
      <input
        type="email"
        placeholder="Danışan e-postasını girin"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit">Raporu Mail Olarak Gönder</button>
    </form>
  );
}
