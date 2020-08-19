import { StyleSheet, Dimensions, Platform } from "react-native";
import { Directions } from "react-native-gesture-handler";

const PRIMARY_COLOR = "#7444C0";
const SECONDARY_COLOR = "#5636B8";
const WHITE = "#FFFFFF";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const BLACK = "#000000";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
	formContainer: {
		// backgroundColor: "white",
		// justifyContent: "center",
		// alignItems: "center",
		// flexDirection: "row",
		// borderRadius: 30,
		// paddingBottom: 15,
		marginTop: 10,
		marginBottom: 20,
		// marginBottom: 10,
		height: DIMENSION_HEIGHT - 50
	},
	// COMPONENT - CARD ITEM
	containerCardItem: {
		backgroundColor: WHITE,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
		marginTop: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 },
		width: DIMENSION_WIDTH - 20,
		height: DIMENSION_HEIGHT
	},
	favoritesCardItem: {
		backgroundColor: WHITE,
		borderRadius: 8,
		alignItems: "center",
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	favoritesDescriptionContainer: {
		width: DIMENSION_WIDTH / 2 - 30
	},
	addToToteButton: {
		width: DIMENSION_WIDTH / 2 - 30,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: 'grey',
		borderRadius: 4,
		padding: 5
	},
	toteCardItem: {
		backgroundColor: WHITE,
		borderRadius: 8,
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	descriptionCardItem: {
		color: GRAY,
		flexDirection: 'row',
		textAlign: "center",
		alignItems: 'center'
	},
	nameCardItem: {
		paddingTop: 15,
		paddingBottom: 7,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: "center",
		alignItems: 'center'
	},
	priceCardItem: {
		paddingTop: 5,
		paddingBottom: 7,
		fontSize: 18,
		textAlign: "center",
		alignItems: 'center'
	},
	actionsCardItem: {
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'center',
		width: DIMENSION_WIDTH - 20
	},
	sizeContainer: {
		width: 100,
		height: 50,
		borderWidth: 1,
		borderColor: 'black',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	sizeButton: {
		width: 30,
		height: 30,
		borderColor: BLACK,
		backgroundColor: WHITE,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		borderWidth: 1,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 }
	},
	button: {
		width: (DIMENSION_WIDTH - 50) / 3,
		height: 50,
		backgroundColor: WHITE,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GRAY,
		borderWidth: 1,
		borderColor: 'black',
		shadowOffset: { height: 10, width: 0 }
	},
	toteActionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		margin: 8,
		width: DIMENSION_WIDTH - 60
	},
	favoriteActionContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		margin: 8,
	},
	nameToteItem: {
		paddingTop: 15,
		paddingBottom: 7,
		fontSize: 16,
		fontWeight: 'bold',
	},
	priceToteItem: {
		paddingTop: 5,
		paddingBottom: 7,
		fontSize: 16,
	},
	desceiptionToteItem: {
		color: GRAY,
		flexDirection: 'row',
	},
	avatar: {
		alignItems: 'flex-start',
		width: 20,
		height: 20,
	},

	// COMPONENT - CITY
	city: {
		backgroundColor: WHITE,
		padding: 10,
		borderRadius: 20,
		width: 90,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	cityText: {
		color: DARK_GRAY,
		fontSize: 13
	},
	sizeContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: "flex-start",
		width: DIMENSION_WIDTH - 50,
	},

	// COMPONENT - FILTERS
	filters: {
		backgroundColor: WHITE,
		padding: 10,
		borderRadius: 20,
		width: 70,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	filtersText: {
		color: DARK_GRAY,
		fontSize: 13
	},
	avatar: {
		borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15
	},
	message: {
		color: GRAY,
		fontSize: 12,
		paddingTop: 5
	},

	// COMPONENT - PROFILE ITEM
	containerProfileItem: {
		backgroundColor: WHITE,
		paddingHorizontal: 10,
		paddingBottom: 25,
		margin: 20,
		borderRadius: 8,
		marginTop: -65,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	matchesProfileItem: {
		width: 131,
		marginTop: -15,
		backgroundColor: PRIMARY_COLOR,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20,
		textAlign: "center",
		alignSelf: "center"
	},
	matchesTextProfileItem: {
		color: WHITE
	},
	name: {
		paddingTop: 25,
		paddingBottom: 5,
		color: DARK_GRAY,
		fontSize: 15,
		textAlign: "center"
	},
	descriptionProfileItem: {
		color: GRAY,
		textAlign: "center",
		paddingBottom: 20,
		fontSize: 13
	},
	info: {
		paddingVertical: 8,
		flexDirection: "row",
		alignItems: "center"
	},
	iconProfile: {
		fontSize: 12,
		color: DARK_GRAY,
		paddingHorizontal: 10
	},
	infoContent: {
		color: GRAY,
		fontSize: 13
	},

	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		resizeMode: "cover",
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT
	},
	bottom: {
		width: DIMENSION_WIDTH - 20,
		marginBottom: 15
	},
	titleContainer: {
		marginHorizontal: 10,
		marginTop: Platform.OS === 'ios' ? 20 : 10,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: 'center'
	},
	top: {
		paddingTop: 30,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center"
	},
	formButton: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 20
	},
	linkContainer: {
		marginTop: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	title: { marginLeft: 20, fontSize: 22, color: DARK_GRAY, textAlign: "center" },

	centerTitle: { fontSize: 22, color: DARK_GRAY, textAlign: "center"},

	icon: {
		fontSize: 20,
		color: DARK_GRAY,
		paddingRight: 10
	},

	// CONTAINER - HOME

	progressBarContainer: {
		height: 12,
		padding: 3,
		marginTop: 60,
		flexDirection: "row",
		justifyContent: "flex-start",
	},

	// CONTAINER - MATCHES
	containerMatches: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10
	},

	// CONTAINER - PROFILE
	containerProfile: { marginHorizontal: 0 },
	photo: {
		width: DIMENSION_WIDTH,
		height: 450
	},
	topIconLeft: {
		fontSize: 20,
		color: WHITE,
		paddingLeft: 20,
		marginTop: -20,
		transform: [{ rotate: "90deg" }]
	},
	topIconRight: {
		fontSize: 20,
		color: WHITE,
		paddingRight: 20
	},
	actionsProfile: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center"
	},
	iconButton: { fontSize: 20, color: WHITE },
	textButton: {
		fontSize: 15,
		color: WHITE,
		paddingLeft: 5
	},
	circledButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: PRIMARY_COLOR,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10
	},
	roundedButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: SECONDARY_COLOR,
		paddingHorizontal: 20
	},

	// MENU
	tabButton: {
		paddingTop: 20,
		paddingBottom: 30,
		alignItems: "center",
		justifyContent: "center",
		flex: 1
	},
	tabButtonText: {
		textTransform: "uppercase"
	},
	iconMenu: {
		height: 20,
		paddingBottom: 7
	},

	questionContainer: {
		marginTop: 40,
		paddingBottom: 20
	},
	question: {
		padding: 10,
		fontSize: 18,
		fontWeight: 'bold'
	},
	options: {
		fontSize: 18
	},
	textInputContainer: {
		backgroundColor: "white",
		borderRadius: 5,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: 10,
		marginBottom: 10,
		borderColor: 'black', borderWidth: 1
	},
	textInput: {
		fontSize: 16,
		fontFamily: "Avenir",
		height: 300
	},
	errorMessage: {
		fontSize: 12,
		color: 'red',
		marginLeft: 10
	},
	transitionContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	transitionMessageContainer: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 200,
		padding: 20,
		height: 150,
		width: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black'
	},
	transitionMessage2Container: {
		marginTop: 20,
		padding: 20,
		height: 150,
		width: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black'
	},
	transitionMessage: {
		fontSize: 18,
		fontWeight: 'bold',
		width: '100%',
		textAlign: 'center'
	},
	containerAccountTitle: {
		flexDirection: 'row',
		backgroundColor: 'rgb(246, 226, 222)',
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#F5DFDC'
	},
	titleButtonStyle: {
		width: DIMENSION_WIDTH - 200,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	accountBodyContainer: {
		margin: 20
	},
	accountTextConatiner: {
		marginTop: 20,
		color: 'grey',
		marginBottom: 5
	},
	accountDataContainer: {
		marginBottom: 20,
		fontSize: 16
	},
	accountTextInput: {
		fontSize: 16,
		borderWidth: 1,
		padding: 5
	},
	label: {
		fontSize: 18
	}
});