import { useState } from 'react';
import foodList from '../data/dummyFoodList';
import '../styles/MealPlanner.css';


export default function MealPlanner() {
  const [meals, setMeals] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [totalCalories, setTotalCalories] = useState(1800); 
  const [sheetData, setSheetData] = useState(null);

  const calculateMealLimit = () => {
    const mealPortions = { breakfast: 0.3, lunch: 0.35, dinner: 0.35 };
    return Object.fromEntries(
      Object.entries(mealPortions).map(([meal, portion]) => [meal, Math.floor(totalCalories * portion)])
    );
  };

  if (sheetData === null) {
    fetch("https://sheetdb.io/api/v1/slcbdmb4n0ps2", {
      method: "GET",
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      }
    }).then(response => {
      var jsonResponse = response.json();
      setSheetData(jsonResponse);
    });
  }

  const limits = calculateMealLimit();

  const getRemainingCalories = (meal) => {
    return limits[meal] - meals[meal].reduce((sum, item) => sum + item.calories, 0);
  };

  const addFoodToMeal = (meal, food) => {
    const remaining = getRemainingCalories(meal);
    if (food.calories <= remaining) {
      setMeals({ ...meals, [meal]: [...meals[meal], food] });
    } else {
      alert(`${food.name} bu öğüne eklenemez. Kalan ${remaining} kaloriyi aşıyor.`);
    }
  };

  return (
    <div className="meal-planner-container">
      <h3>Öğün Planlayıcı</h3>

      <div className="calorie-input">
        <label>Toplam Günlük Kalori: </label>
        <input
          type="number"
          value={totalCalories}
          onChange={(e) => setTotalCalories(parseInt(e.target.value) || 0)}
        />
      </div>

      {['breakfast', 'lunch', 'dinner'].map(meal => (
        <div key={meal} className="meal-section">
          <h4>{meal === 'breakfast' ? 'Kahvaltı' : meal === 'lunch' ? 'Öğle' : 'Akşam'} - Kalan Kalori: {getRemainingCalories(meal)}</h4>
          <ul>
            {meals[meal].map((item, idx) => (
              <li key={idx}>{item.name} - {item.calories} cal</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="food-list">
        <h4>Besinler</h4>
        {foodList.map((food, i) => (
          <div key={i} className="food-item">
            <span>{food.name} - {food.calories} cal</span>
            <div className="food-buttons">
              <button onClick={() => addFoodToMeal('breakfast', food)}>Kahvaltıya</button>
              <button onClick={() => addFoodToMeal('lunch', food)}>Öğleye</button>
              <button onClick={() => addFoodToMeal('dinner', food)}>Akşama</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
