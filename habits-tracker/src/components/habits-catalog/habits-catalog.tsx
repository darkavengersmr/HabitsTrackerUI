import { Container, Grid, GridItem, Select, Text, useColorMode } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React, {useState, useEffect} from "react"
import catalog from "../../store/catalog"
import AddHabit from "../add-habit"
import { ICatalog } from "../../interfaces/interface"
import categories from "../../store/categories"
import { useInput } from "../../hooks"

function bgImage(category: string, theme: string): string {
    const color = theme === "dark" ? 0 : 255
    return `linear-gradient(rgba(${color}, ${color}, ${color}, 1), 
           rgba(2${color}, ${color}, ${color}, 0.4)), url('../../images/${category}.png')`
}

const catalogItem = (habit: ICatalog, colorMode: string) => {
    return (
    <GridItem w='320px' 
              h='160px'
              borderWidth={2}                          
              key={habit._id} 
              borderRadius="16px"
              bgImage={bgImage(habit.category, colorMode)}
              _before={{                            
                opacity: 0.9
              }}
    >                    
        <Grid>
            <GridItem w='320px'
                      h='80px'
                      gridColumn="span 4"                                  
            >
                <Text fontSize={18} mt={4} ml={4} noOfLines={2}>
                    {habit.title} 
                </Text>
                <Text fontSize={14} mt={2} ml={4} mr={4} noOfLines={5}>
                    {habit.detail} 
                </Text>        
            </GridItem>
        </Grid>
                                    
    </GridItem>
)}

const HabitsCatalog: React.FC = observer(() => {
    const categoryFilter = useInput('all', "notNullText")
    const categoriesCount = catalog.getFilteredByCategory(categoryFilter.value).length
    const { colorMode } = useColorMode()        

    const initialCategories = {} as {[key: string]: string}

    const [myCategories, setCategories] = useState(initialCategories);

    useEffect(()=>{
        catalog.updateCatalog();        
        categories.getCategories().then((res) => {
            setCategories(res)
        })
    },[])

    return (
        <>
        <Container mt={4} mb={0}
                   justifyContent="center" 
                   display="flex"                                      
                   >
            <Select value={categoryFilter.value}                            
                    isInvalid={categoryFilter.isInvalid}
                    errorBorderColor={categoryFilter.errorBorderColor}                            
                    onBlur={categoryFilter.onBlur}
                    onChange={(e) => categoryFilter.onChange(e)}
            >
                {
                    Object.keys(myCategories).map((c) => (
                        <option value={c} 
                                key={c}
                        >
                            {myCategories[c]}
                        </option>
                    ))
                }
            </Select>
        </Container>
        <Container mt={4} mb={8}
                justifyContent="center" 
                display="flex"                                      
                >
            <Grid templateColumns={{ base: "repeat(1, 1fr)", 
                                     md: categoriesCount > 1 ? "repeat(2, 1fr)" : "repeat(1, 1fr)", 
                                     lg: categoriesCount > 1 ? "repeat(3, 1fr)" : "repeat(1, 1fr)",
                                     xl: categoriesCount > 1 ? "repeat(4, 1fr)" : "repeat(1, 1fr)"
                                    }}
                  gap={2}                  
            >
                {catalog.getFilteredByCategory(categoryFilter.value).map((habit) => <AddHabit key={habit._id} 
                                                       title={habit.title}
                                                       category={habit.category}
                                             >
                    {catalogItem(habit, colorMode)}
                </AddHabit>)}
                                                        
            </Grid>
        </Container>
        </>
    )
})

export default HabitsCatalog