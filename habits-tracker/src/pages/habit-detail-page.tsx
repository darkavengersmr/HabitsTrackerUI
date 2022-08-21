import { useParams } from 'react-router-dom';
import AppHeader from '../components/app-header';
import HabitDetail from '../components/habit-detail';
import { observer } from 'mobx-react-lite';
import habits from "../store/habits";
import { Container, Text } from '@chakra-ui/react';
import AddHabit from '../components/add-habit';
import RemoveHabit from '../components/remove-habit';
import EditHabit from '../components/edit-habit/edit-habit';

const HabitDetailPage = observer(() => {

  const { id = "-1" } = useParams()

  const habit = habits.habitById(parseInt(id))

  const chartData = habits.chartData(parseInt(id))

  if (!habit.title) {
    return (
      <>
          <AppHeader AppHeaderComponents={[AddHabit]}/>
          <Container mt={5} mb={8}>            
            <Text fontSize={24} mt={8} align="center">
              У вас нет такой привычки
            </Text>        
        </Container>
      </>    
    )
  } else {
    return (
      <>
          <AppHeader AppHeaderComponents={[EditHabit, RemoveHabit]}/>
          <HabitDetail habit={habit} data={chartData} />
      </>    
    )
  }

  
})

export default HabitDetailPage;