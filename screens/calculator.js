import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';

export default class ImageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalBeforeTax: 0,            //user input total
            currentTotal: 0,              //total after plates have been divided
            tax: 0,
            tip: 0,                       
            tipPercent: 0,
            people: this.props.navigation.state.params.people,
            currentDisplay: 0
        }
    }

    componentDidMount() {
        console.log("start")
    }

    nextDisplay = () => {
        let display = this.state.currentDisplay + 1;
        this.setState({
            currentDisplay: display
        });
    }

    prevDisplay = () => {
        let display = this.state.currentDisplay - 1;
        this.setState({
            currentDisplay: display
        });
    }

    setTipAmount = (percentage) => {
        let tip = this.state.totalBeforeTax * percentage / 100.0
        this.setState({tip})
    }

    splitBill = () => {
    
    }

    render() {
        let inputDisplay;
        if (this.state.currentDisplay === 0) {
            inputDisplay =
                <View>
                    <Text>Total before tax: </Text>
                    <TextInput
                        onChangeText={(input) => this.setState({ totalBeforeTax: input, currentTotal: input })}
                        style={{ backgroundColor: '#afccdb' }}
                        placeholder="0.00"
                        value={`${this.state.totalBeforeTax}`}
                        keyboardType='numeric'
                        returnKeyType='done'
                    />
                </View>
        }
        else if (this.state.currentDisplay === 1) {
            inputDisplay =
                <View>
                    <Text>Total before tax: {this.state.totalBeforeTax}</Text>
                    <Text>Tax: </Text>
                    <TextInput
                        onChangeText={(input) => this.setState({ tax: input })}
                        style={{ backgroundColor: '#afccdb' }}
                        placeholder="0.00"
                        value={`${this.state.tax}`}
                        keyboardType='numeric'
                        returnKeyType='done'
                    />
                </View>
        }
        else if (this.state.currentDisplay === 2) {
            inputDisplay =
                <View>
                    <Text>Total before tax: {this.state.totalBeforeTax}</Text>
                    <Text>Tax: {this.state.tax}</Text>
                    <Text>Tip: </Text>
                    <TextInput
                        onChangeText={(input) => {this.setState({ tipPercent: input }); this.setTipAmount(input)}}
                        style={{ backgroundColor: '#afccdb' }}
                        placeholder="0.00"
                        value={`${this.state.tipPercent}`}
                        keyboardType='numeric'
                        returnKeyType='done'
                    />
                </View>
        }
        else if (this.state.currentDisplay === 3) {
            inputDisplay =
                <View>
                    <Text>Total before tax: {this.state.totalBeforeTax}</Text>
                    <Text>Tax: {this.state.tax}</Text>
                    <Text>Tip: {this.state.tip}</Text>

                </View>
        }

        let nextBtn;
        if(this.state.currentDisplay < 3) {
            nextBtn =
                <Button
                    title="Next"
                    onPress={this.nextDisplay}
                />
        }
        let prevBtn;
        if(this.state.currentDisplay > 0) {
            prevBtn =
                <Button
                    title="Prev"
                    onPress={this.prevDisplay}
                />
        }

        let splitBtn;
        if(this.state.currentDisplay === 3 && this.state.currentTotal !== 0){
            if(this.state.totalBeforeTax === this.state.currentTotal) {
                splitBtn =
                    <Button
                        title="Split Bill"
                        onPress={this.splitBill}
                    />
            }
            else {
                splitBtn =
                    <View>
                        <Text>Remaining Amount: {this.state.currentTotal}</Text>
                        <Button
                            title="Split"
                            onPress={this.splitBill}
                        />
                    </View>
            }
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {inputDisplay}
                <View>
                    {nextBtn}
                    {prevBtn}
                    {splitBtn}
                </View>
                <View>
                    {this.state.people.map((element, index) => {
                        return <Text key={index}>{element}</Text>
                    })}
                </View>
            </View>
        );
    }
}
