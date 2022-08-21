import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { useColorMode } from "@chakra-ui/react";
import { IChartData } from "../../interfaces/interface";

interface IHabitChartProps {
    data: IChartData[]
}

export default function HabitChart({data}: IHabitChartProps) {
    const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary, 
    }),
    []
  );

  const secondaryAxes = React.useMemo<
  AxisOptions<typeof data[number]["data"][number]>[]
>(
  () => [
    {
      getValue: (datum) => datum.secondary,      
      elementType: "area",
    }
  ],
  []
);

  const { colorMode } = useColorMode()

  return (
    <>
        <div style={{ width: "100%", height: 240, marginTop: 10 }}>
          <Chart
            options={{
              data,              
              primaryAxis,
              secondaryAxes,              
              dark: colorMode === 'dark' ? true : false,              
            }}
          />
        </div>
    </>
  );
}
