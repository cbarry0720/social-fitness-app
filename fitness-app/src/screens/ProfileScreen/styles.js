import {
    StyleSheet
} from "react-native";

export default StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    add: {
        alignSelf: "flex-start",
        paddingTop: 10,
        fontSize: 30
    },
    settings: {
        alignSelf: "flex-end",
        paddingRight: 10,
        paddingTop: 10,
        fontSize: 20
    },
    info: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    username: {
        fontSize: 24,
        padding: 5,
    },
    infoItem: {
        alignItems: "center"
    },
    pfp: {
        width: 75,
        height: 75,
        borderRadius: 100,
        padding: 10
    },
    followers: {
        fontSize: 28
    },
    following: {
        fontSize: 28
    },
    menuIOS: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop:20
    },
    menuWeb: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop:50
    },
    menuText: {
        fontSize: 22,
        padding: 5
    },
    menuTextBold: {
        fontSize: 22,
        fontWeight: "bold",
        padding: 5
    },
    edit: {
        fontSize: 18,
        padding: 2,
        color: "white",
        backgroundColor: "gray",
        borderRadius: 5,
        marginTop: 5
    }
});