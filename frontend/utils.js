import { Text } from "react-native";

export const calculateTotalTime = 
    (workTime, repetitions, restTime) => workTime * repetitions + restTime * (repetitions - 1);

export const showTimer = (totalTime, styles) => (
    <Text style={styles}>
        { new Date(totalTime * 1000).toISOString().slice(11, 19) }
    </Text>
)