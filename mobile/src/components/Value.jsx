import {Text, View } from 'react-native'
import React from 'react'

// This is a temporary component.
const Value = ({ label, value }) => (
    <View style={{ marginBottom: 8 }}>
        <Text style={{ color: 'white' }}>{label}</Text>
        <Text style={{ color: 'white' }}>{value}</Text>
    </View>
);

export default Value