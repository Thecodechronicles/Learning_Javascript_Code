export function createReducer(
    initialState,
    mapOrBuilderCallback,
    actionMatchers = [],
    defaultCaseReducer
) {
    let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] =
        typeof mapOrBuilderCallback === "function"
            ? executeReducerBuilderCallback(mapOrBuilderCallback)
            : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer]

    return function (state = initialState, action) {
        let caseReducers = [
            actionsMap[action.type], // {'counter/increment': function increment(){}, 'counter/toggleCounter': function toggleCounter(){}}
            ...finalActionMatchers
                .filter(({ matcher }) => matcher(action))
                .map(({ reducer }) => reducer)
        ]
        if (caseReducers.filter(cr => !!cr).length === 0) {
            caseReducers = [finalDefaultCaseReducer]
        }

        return caseReducers.reduce((previousState, caseReducer) => {
            if (caseReducer) {
                if (isDraft(previousState)) {
                    // If it's already a draft, we must already be inside a `createNextState` call,
                    // likely because this is being wrapped in `createReducer`, `createSlice`, or nested
                    // inside an existing draft. It's safe to just pass the draft to the mutator.
                    const draft = previousState // We can assume this is already a draft
                    const result = caseReducer(draft, action)

                    if (typeof result === "undefined") {
                        return previousState
                    }

                    return result
                } else if (!isDraftable(previousState)) {
                    // If state is not draftable (ex: a primitive, such as 0), we want to directly
                    // return the caseReducer func and not wrap it with produce.
                    const result = caseReducer(previousState, action)

                    if (typeof result === "undefined") {
                        if (previousState === null) {
                            return previousState
                        }
                        throw Error(
                            "A case reducer on a non-draftable value must not return undefined"
                        )
                    }

                    return result
                } else {
                    // @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
                    // than an Immutable<S>, and TypeScript cannot find out how to reconcile
                    // these two types.
                    return createNextState(previousState, draft => {
                        return caseReducer(draft, action)
                    })
                }
            }

            return previousState
        }, state)
    }
}
