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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
	line: {
		borderBottomColor: TEXT_COLOR,
		borderBottomWidth: 5,
		width: '60%'
	},
    homeContainer: {
		marginTop: 50,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: DIMENSION_WIDTH-100,
		height: DIMENSION_HEIGHT-180,
		backgroundColor: '#506160',
		opacity: 0.5
    },
    containerMessage: {
		alignItems: "center",
		justifyContent: "center",
		height: 50
	},
    homeText: {
		color: TEXT_COLOR,
		paddingBottom: 10,
        fontSize: 16
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