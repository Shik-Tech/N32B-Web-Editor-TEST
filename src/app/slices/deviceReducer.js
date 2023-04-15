import { createSlice } from '@reduxjs/toolkit'

export const deviceSlice = createSlice({
    name: 'device',
    initialState: {
        firmwareVersion: null,
        deviceIsConnected: false,
        midiInput: null,
        midiOutput: null,
        midiDeviceName: null,
        systemMessage: null,
        openMessageDialog: false
    },
    reducers: {
        setMidiInput: (state, action) => {
            state.midiInput = action.payload;
        },
        setMidiOutput: (state, action) => {
            state.midiOutput = action.payload;
        },
        setDeviceIsConnected: (state, action) => {
            state.deviceIsConnected = action.payload;
            if (action.payload === false) {
                state.midiInput = null;
                state.midiOutput = null;
            }
        },
        setMidiDeviceName: (state, action) => {
            state.midiDeviceName = action.payload;
        },
        setFirmwareVersion: (state, action) => {
            state.firmwareVersion = action.payload;
        },
        setSystemMessage: (state, action) => {
            state.systemMessage = action.payload;
        },
        openMessageDialog: (state, action) => {
            state.openMessageDialog = action.payload;
        }
    }
})

export const {
    setMidiInput,
    setMidiOutput,
    setDeviceIsConnected,
    setMidiDeviceName,
    setFirmwareVersion,
    setSystemMessage,
    openMessageDialog
} = deviceSlice.actions;

export default deviceSlice.reducer