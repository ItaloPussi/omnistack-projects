import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {BorderlessButton} from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
interface HeaderProps{
	title: string,
	showHomeButton?: boolean
}
export default function Header({title, showHomeButton}: HeaderProps){
	const navigation = useNavigation()

	function handleNavigationToHomeScreen(){
		navigation.navigate("OrphanagesMap")
	}

	return (
		<View style={styles.container}>
			<BorderlessButton  onPress={navigation.goBack}>
				<Feather name="arrow-left" size={24} color="#15b6d6" />
			</BorderlessButton>

			<Text style={styles.title}>{title}</Text>

			{showHomeButton ?
				<BorderlessButton  onPress={handleNavigationToHomeScreen}>
					<Feather name="home" size={24} color="#15b6d6" />
				</BorderlessButton>
			 :
			 	<View />
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		padding:24,
		backgroundColor: "#f9fafc",
		borderBottomWidth: 1,
		borderColor: "#DDE3F0",
		paddingTop: 44,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},

	title:{
		fontFamily: "Nunito_600SemiBold",
		color: "#8FA7B3",
		fontSize: 16
	}
})