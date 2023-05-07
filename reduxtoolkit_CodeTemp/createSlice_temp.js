export function createSlice(options) {
    const { name, initialState } = options
    if (!name) {
        throw new Error("`name` is a required option for createSlice")
    }
    const reducers = options.reducers || {}
    const [
        extraReducers = {},
        actionMatchers = [],
        defaultCaseReducer = undefined
    ] =
        typeof options.extraReducers === "undefined"
            ? []
            : typeof options.extraReducers === "function"
                ? executeReducerBuilderCallback(options.extraReducers)
                : [options.extraReducers]

    const reducerNames = Object.keys(reducers)

    const sliceCaseReducersByName = {}
    const sliceCaseReducersByType = {}
    const actionCreators = {}

    reducerNames.forEach(reducerName => {
        const maybeReducerWithPrepare = reducers[reducerName]
        const type = getType(name, reducerName)

        let caseReducer
        let prepareCallback

        if ("reducer" in maybeReducerWithPrepare) {
            caseReducer = maybeReducerWithPrepare.reducer
            prepareCallback = maybeReducerWithPrepare.prepare
        } else {
            caseReducer = maybeReducerWithPrepare
        }

        sliceCaseReducersByName[reducerName] = caseReducer
        sliceCaseReducersByType[type] = caseReducer
        actionCreators[reducerName] = prepareCallback
            ? createAction(type, prepareCallback)
            : createAction(type)
    })

    const finalCaseReducers = { ...extraReducers, ...sliceCaseReducersByType }
    const reducer = createReducer(
        initialState,
        finalCaseReducers,
        actionMatchers,
        defaultCaseReducer
    )

    return {
        name,
        reducer,
        actions: actionCreators,
        caseReducers: sliceCaseReducersByName
    }
}