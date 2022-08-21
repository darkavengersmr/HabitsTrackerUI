import AppHeader from '../components/app-header';
import { observer } from 'mobx-react-lite';
import AddHabit from '../components/add-habit';
import Reports from '../components/reports';

const ReportsPage = observer(() => {

    return (
        <>
            <AppHeader AppHeaderComponents={[AddHabit]}/>
            <Reports />
        </>    
    )

})

export default ReportsPage;