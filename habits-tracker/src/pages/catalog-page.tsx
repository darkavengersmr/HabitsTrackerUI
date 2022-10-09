import AddHabbit from '../components/add-habit'
import AppHeader from '../components/app-header'
import HabitsCatalog from '../habits-catalog';

function HabitsCatalogPage() {
  return (
    <>
        <AppHeader AppHeaderComponents={[AddHabbit]} />
        <HabitsCatalog />        
    </>    
  );
}

export default HabitsCatalogPage;