import AddHabbit from '../components/add-habit';
import AppHeader from '../components/app-header';
import HabitsList from '../components/habits-list';

function habitsPage() {
  return (
    <>
        <AppHeader AppHeaderComponents={[AddHabbit]}/>
        <HabitsList/>        
    </>    
  );
}

export default habitsPage;