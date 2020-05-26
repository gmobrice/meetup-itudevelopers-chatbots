export interface IDestination
{
    id: number,
    name: string,
    flag: string,
    latitude: number,
    longitude: number,
    photo: string
}

export interface ITrip
{
    id: number,
    name: string,
    origin: IDestination,
    destination: IDestination,
    price: number
}

export interface ISearchTripState
{
    today: string,
    origin: string,
    destination: string,
    startDate: string,
    endDate: string,
    destinations: IDestination[],
    suggestions: string[],
    trip: ITrip[],
    alert: boolean,
    alertText: string,
    result: boolean
}

export interface IAutoCompleteProps
{
    suggestions: string[],
    placeholder: string,
    name: string,
    onChange: (val: string, name: string) => void
}

export interface IAutoCompleteState
{
    activeSuggestion: number,
    filteredSuggestions: string[],
    showSuggestions: boolean,
    inputValue: string
}