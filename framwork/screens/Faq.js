import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { styles } from "../styles/faq";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowLeft, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { List } from 'react-native-paper';

export function Faq({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={{ margin: 18 }}>
                {/* <FontAwesomeIcon
            icon={faArrowLeft}
            size={25}
            /> */}
            </View>
            <View style={{ margin: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size={25}
                        color={'#787A8D'}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>

                <List.AccordionGroup>
                    <List.Accordion title="What is Hagmus" id="1">
                        {/* <List.Item title="" style={{height:100,}}/> */}
                        <Text style={{color:'white'}}>Hagmus is an online exchange where users can trade cryptocurrencies.
                        It supports hundreds of the most commonly traded cryptocurrencies</Text>
                    </List.Accordion>
                    <List.Accordion title="Accordion 2" id="2">
                        <List.Item title="Item 2" />
                    </List.Accordion>
                    <View>
                        <Text>
                            List.Accordion can be wrapped because implementation uses React.Context.
                        </Text>
                        <List.Accordion title="Accordion 3" id="3">
                            <List.Item title="Item 3" />
                        </List.Accordion>
                    </View>
                </List.AccordionGroup>


            </View>
        </View>
    )
}