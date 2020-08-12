import { StyleSheet, Dimensions } from "react-native";
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
		borderBottomColor: TEXT_COLOR,
		borderBottomWidth: 5,
		width: '60%',
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
		paddingBottom: 10,
		fontSize: 16,
	},
	homeTitle: {
        marginTop: 20,
		paddingBottom: 10,
		fontSize: 22,
		color: TEXT_COLOR,
		fontWeight: 'bold',
		width: '100%',
		textAlign: 'center'
	},

});