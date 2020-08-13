import { StyleSheet, Dimensions, Platform } from "react-native";
import { Directions } from "react-native-gesture-handler";


const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;
const TEXT_COLOR='rgb(255, 255, 255)'

export default StyleSheet.create({
    backgroudContainer: {
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT
    },
    mainContainer: {
		marginTop: 50,
		width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
	line: {
		borderBottomColor: 'rgb(246, 226, 222)',
		borderBottomWidth: 5,
		width: '70%',
		marginBottom: 20
	},
    homeContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: DIMENSION_WIDTH-100,
		backgroundColor: 'rgba(33, 59, 59, 0.7)',
		opacity: 1,
		paddingBottom: 40
    },
    containerMessage: {
		alignItems: "center",
		justifyContent: "center",
		height: 60
	},
    homeText: {
		color: TEXT_COLOR,
		paddingBottom: 15,
		fontSize: 20,
		fontWeight: '400',
		fontFamily: Platform.OS === 'ios' ? 'OpenSans' : 'open-sans-regular'
	},
	homeTitle: {
        marginTop: 20,
		paddingBottom: 10,
		fontSize: 24,
		color: TEXT_COLOR,
		fontWeight: 'bold',
		width: '100%',
		textAlign: 'center',
		fontFamily: Platform.OS === 'ios' ? 'OpenSans-Bold' : 'OpenSans-Bold'
	},

});