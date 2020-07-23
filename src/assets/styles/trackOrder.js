import { StyleSheet, Dimensions } from "react-native";
import { Directions } from "react-native-gesture-handler";


const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
    mainContainer: {
        marginTop: 40
    },
    trackOrderContainer: {
        paddingTop: 15,
        // paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10,
        // marginBottom: 10,
        height: DIMENSION_HEIGHT
    },
    headerContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 20
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    titleText: {
        color: 'grey',
        fontSize: 12,
        fontWeight: 'bold'
    },
    trackDataContainer: {

    },
    dateContainer: {
        width: 80
    },
    detailContainer: {
        borderLeftWidth: 3,
        borderLeftColor: 'green',
        height: 80,
        marginLeft: 98
    },
    progressDetailContainer: {
        borderLeftWidth: 3,
        borderLeftColor: 'grey',
        height: 80,
        marginLeft: 98
    },
    successCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    progressCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'grey',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    detailText: {
        paddingTop: 10,
        paddingLeft: 20
    }

});