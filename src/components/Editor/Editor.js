import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { map } from "lodash";
import React from "react";
import ChannelSelect from "./Components/ChannelSelect";
import {
    ControlChangeMacroForm,
    ControlChangeForm,
    ControlChangeHiResForm,
    ControlChangeRPNForm
} from "./Forms";
import { ModeIndexes, Modes } from "./Modes";
import { useDataDispatch } from "../../reducer/context";

function Editor(props) {
    const {
        currentKnob,
        handleKnobDataChange,
        firmwareVersion,
    } = props;

    function handleChannelChange(event) {
        if (firmwareVersion[0] < 4) {
            handleKnobDataChange(
                currentKnob, {
                channel: parseInt(event.target.value)
            });
        } else if (firmwareVersion[0] > 3) {
            handleKnobDataChange(
                currentKnob, {
                channel_a: parseInt(event.target.value)
            });
        }
    }

    function handleModeSelect(e) {
        dispatch({
            type: "modeChanged",
            currentKnob: {
                ...currentKnob,
                mode: parseInt(e.target.value)
            }
        });
    }

    const dispatch = useDataDispatch();
    const displayForms = [
        <></>,
        <ControlChangeForm {...props} />,
        <ControlChangeMacroForm {...props} />,
        <ControlChangeRPNForm {...props} />,
        <ControlChangeRPNForm {...props} />,
        <ControlChangeHiResForm {...props} />
    ];

    return (
        <Stack
            spacing={2}
        >
            <FormControl fullWidth size="small">
                <InputLabel id="mode-select-label">Knob Mode</InputLabel>
                <Select
                    labelId="mode-select-label"
                    id="mode-select"
                    label="Knob Mode"
                    value={currentKnob.mode}
                    onChange={handleModeSelect}
                >
                    {map(Modes, mode =>
                        <MenuItem value={mode.value} key={mode.value}>{mode.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {
                firmwareVersion[0] < 4 &&
                currentKnob.mode !== ModeIndexes.KNOB_MODE_DISABLE &&
                <FormControl fullWidth size="small">
                    <InputLabel id="channel-select-label">Channel</InputLabel>
                    <ChannelSelect
                        channel={currentKnob.channel}
                        handleChannelChange={handleChannelChange}
                        label="Channel" />
                </FormControl>
            }
            {
                firmwareVersion[0] > 3 &&
                currentKnob.mode !== ModeIndexes.KNOB_MODE_DISABLE &&
                currentKnob.mode !== ModeIndexes.KNOB_MODE_MACRO &&
                <FormControl fullWidth size="small">
                    <InputLabel id="channel-select-label">Channel</InputLabel>
                    <ChannelSelect
                        channel={currentKnob.channel_a}
                        handleChannelChange={handleChannelChange}
                        label="Channel" />
                </FormControl>
            }
            {displayForms[currentKnob.mode]}
        </Stack>
    );
}

export default Editor;