import {includes} from 'lodash'

export function validateCombinationX3(line: string[], iconCode: string, isDebugModeEnabled: boolean = false) {
    const condition: boolean = line[0] === iconCode && line[1] === iconCode && line[2] === iconCode;
    if (isDebugModeEnabled && condition) console.debug(`Winning combination has been found: ${line}`);
    return condition;
}

export function validateCombinationHasSymbols(
    line: string[],
    iconCodes: string[],
    isDebugModeEnabled: boolean = false) {

    const condition: boolean = !includes(iconCodes.map(iconCode => includes(line, iconCode)), false);
    if (isDebugModeEnabled && condition)
        console.debug(`Winning combination has been found. Following symbols exist at row: ${iconCodes}`);
    return condition
}