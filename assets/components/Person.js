import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class Person extends React.Component {
    constructor(props){
        super(props)
    }
 

    componentDidMount(){
        // console.log(this.props.people)
    }
    render () {
    return (
        <View>
            <Text>{this.props.people.name} </Text>
            {this.props.people.items.map((item, index) => {
                return(
                <View 
                key = {index + 1}>
                    <Text
                    key ={index}
                    >${item} 
                    </Text> 
                    <Button
                    key = {item}
                    title = "x"
                    onPress = {() => this.props.deleteItem(this.props.id, index)}
                    >
                    </Button>
                </View>
                )
            })}
            <Text>Total: ${this.props.people.total}</Text>
            <TextInput
            placeholder = "00.00"
            keyboardType = 'numeric'
            returnKeyType='done'
            //value = {this.props.newItem}
            onChangeText={(input) => this.props.handleItemChange(input)}
            
            
            
            />
            <Button
            title = "Add"
            onPress = {this.props.addItem}
            />
            
        </View>
    ) 
    }
}