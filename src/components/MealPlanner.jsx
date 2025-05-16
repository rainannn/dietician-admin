import { useState, useEffect } from 'react';
import { Input, Button, Card, Row, Col, Typography, message } from 'antd';
import foodList from '../data/dummyFoodList';
import '../styles/MealPlanner.css';

const { Title, Text } = Typography;

export default function MealPlanner() {
  const [meals, setMeals] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [totalCalories, setTotalCalories] = useState(1800);
  const [sheetData, setSheetData] = useState(null);

  useEffect(() => {
    // Fetch only once on mount
    fetch("https://sheetdb.io/api/v1/slcbdmb4n0ps2")
      .then(response => response.json())
      .then(json => setSheetData(json))
      .catch(err => console.error("Error fetching sheet data:", err));
  }, []);

  const calculateMealLimit = () => {
    const mealPortions = { breakfast: 0.3, lunch: 0.35, dinner: 0.35 };
    return Object.fromEntries(
      Object.entries(mealPortions).map(([meal, portion]) => [meal, Math.floor(totalCalories * portion)])
    );
  };

  const limits = calculateMealLimit();

  const getRemainingCalories = (meal) => {
    return limits[meal] - meals[meal].reduce((sum, item) => sum + item.calories, 0);
  };

  const addFoodToMeal = (meal, food) => {
    const remaining = getRemainingCalories(meal);
    if (food.calories <= remaining) {
      setMeals({ ...meals, [meal]: [...meals[meal], food] });
    } else {
      message.warning(`${food.name} bu öğüne eklenemez. Kalan ${remaining} kaloriyi aşıyor.`);
    }
  };

  return (
    <div className="meal-planner-container" style={{ padding: 20 }}>
      <Title level={3}>Öğün Planlayıcı</Title>

      <div style={{ marginBottom: 20 }}>
        <Text strong>Toplam Günlük Kalori:</Text>
        <Input
          type="number"
          value={totalCalories}
          onChange={(e) => setTotalCalories(parseInt(e.target.value) || 0)}
          style={{ width: 200, marginLeft: 10 }}
        />
      </div>

      <Row gutter={16}>
        {['breakfast', 'lunch', 'dinner'].map((meal) => (
          <Col span={8} key={meal}>
            <Card
              title={`${meal === 'breakfast' ? 'Kahvaltı' : meal === 'lunch' ? 'Öğle' : 'Akşam'} - Kalan Kalori: ${getRemainingCalories(meal)}`}
              bordered
              style={{ marginBottom: 20 }}
            >
              <ul>
                {meals[meal].map((item, idx) => (
                  <li key={idx}>{item.name} - {item.calories} cal</li>
                ))}
              </ul>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={4}>Besinler</Title>
      <Row gutter={[16, 16]}>
        {foodList.map((food, i) => (
          <Col xs={24} sm={12} md={8} lg={6} key={i}>
            <Card size="small" title={`${food.name} - ${food.calories} cal`}>
              <Button block style={{ marginBottom: 5 }} onClick={() => addFoodToMeal('breakfast', food)}>Kahvaltıya Ekle</Button>
              <Button block style={{ marginBottom: 5 }} onClick={() => addFoodToMeal('lunch', food)}>Öğleye Ekle</Button>
              <Button block onClick={() => addFoodToMeal('dinner', food)}>Akşama Ekle</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
