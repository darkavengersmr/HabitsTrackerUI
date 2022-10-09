import AddHabit from '../components/add-habit';
import AppHeader from '../components/app-header';
import UserPrefs from '../components/user-prefs';

function ProfilePage() {
  return (<>
    <AppHeader AppHeaderComponents={[AddHabit]}/>
    <UserPrefs />
  </>    
  );
}

export default ProfilePage;