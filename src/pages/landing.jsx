import { useEffect, useState } from "react";
import MealCard from "../components/meal-card";
import Modal from "../components/modal";
import "../App.css";

const weeks = [0, 1, 2, 3, 4];

function Landing() {
  const handleScroll = () => {
    setTop(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [top, setTop] = useState(0);
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [week, setWeek] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = (mealId) => {
    const updatedMeals = meals.map((meal) => {
      if (meal.id === mealId) {
        return {
          ...meal,
          weeks: meal.weeks.filter((weekNo) => weekNo !== week),
        };
      }
      return meal;
    });

    setMeals(updatedMeals);
  };

  const addToWeek = () => {
    const formattedMeals = meals.map((item) => {
      const isSelected = selectedMeal.some(
        (selectedItem) => selectedItem.id === item.id
      );
      if (isSelected) {
        return { ...item, weeks: [...item.weeks, selectedWeek] };
      }
      return item;
    });

    setMeals(formattedMeals);
    setSelectedMeal([]);
    setSelectedWeek(1);
  };

  useEffect(() => {
    setSelectedMeal([]);
  }, [week]);

  useEffect(() => {
    setLoading(true);
    fetch("http://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data?.recipes?.map((recipe) => ({
          ...recipe,
          weeks: [],
        }));
        setMeals(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err, "err");
      });
  }, []);
  return (
    <>
      <div className="hero">
        <div className="overlay"></div>
        <p className="hero-title">Optimized Your Meal</p>
        <p className="hero-desc">
          Select Meal to Add in Week. You will be able to edit. modify and
          change the Meal Weeks.
        </p>
      </div>
      <div className="container">
        <p>Week Orders</p>
        <div className="menu-container">
          <div className="menu">
            {weeks.map((weekCount) => {
              return (
                <p
                  onClick={() => setWeek(weekCount)}
                  key={weekCount}
                  className={`week ${week === weekCount ? "active" : ""}`}
                >
                  {weekCount ? `week ${weekCount}` : "All Meals"}
                </p>
              );
            })}
            <button
              onClick={handleOpenModal}
              disabled={week !== 0 || selectedMeal <= 0}
              className={`${
                week !== 0 || selectedMeal <= 0 ? "disabled" : ""
              } btn`}
            >
              Add to Week
            </button>
          </div>
        </div>
        <div className="listing">
          {!loading ? (
            week === 0 || meals.length > 0 ? (
              meals.map((meal) => {
                const selected = selectedMeal.filter(
                  (sMeal) => sMeal.id === meal.id
                );
                const selectedWeek = week === 0 || meal.weeks.includes(week);
                return (
                  selectedWeek && (
                    <MealCard
                      key={meal.id}
                      week={week}
                      selected={selected.length > 0}
                      handleSelect={() => {
                        if (week === 0) {
                          if (selected.length > 0) {
                            setSelectedMeal(
                              selectedMeal.filter(
                                (sMeal) => sMeal.id !== meal.id
                              )
                            );
                          } else {
                            setSelectedMeal([...selectedMeal, meal]);
                          }
                        }
                      }}
                      handleDelete={handleDelete}
                      {...meal}
                    />
                  )
                );
              })
            ) : (
              <div className="loader-container">No Data</div>
            )
          ) : (
            <div className="loader-container">Loading...</div>
          )}
        </div>
      </div>
      <Modal
        top={top}
        addToWeek={addToWeek}
        show={showModal}
        handleClose={handleCloseModal}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
      />
    </>
  );
}

export default Landing;
