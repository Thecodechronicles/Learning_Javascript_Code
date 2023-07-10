// store.dispatch() method implementation
function dispatch(action) {

    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
        throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
        throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.');
    }

    try {
        isDispatching = true;
        currentState = currentReducer(currentState, action); // 'currentReducer' can either be a 'reducer' function like customReducer or a 'combination' function. The return value of which would be stored in 'currentState' 
    }

    finally {
        isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener();
    }
    return action;
}




function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
        throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
        var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
        if (warningMessage) {
            Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
        }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
        var _key = finalReducerKeys[_i]; // someReducer
        var reducer = finalReducers[_key]; //customReducer
        var previousStateForKey = state[_key]; //state.someReducer
        var nextStateForKey = reducer(previousStateForKey, action);
        if (typeof nextStateForKey === 'undefined') {
            var errorMessage = getUndefinedStateErrorMessage(_key, action);
            throw new Error(errorMessage);
        }
        nextState[_key] = nextStateForKey; //
        // {
        //     someReducer: [                       // 1st Iteration
        //         { amount:"", createdAt: "" }, 
        //         { amount:"", createdAt: "" }],
        //     anotherReducer: {}                   // 2nd iteration 
        // }
        //  OR
        // {
        //     someReducer: { count:1 },     // 1st iteration
        //     anotherReducer: {count: 5}    // 2nd iteration
        // }
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
}





function Connect(props, context) { // In actuality it is 'Class Connect extends Component. inside of 'wrapWithConnect' // returned by connect()()
    _classCallCheck(this, Connect);
    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.version = version;
    _this.state = {};
    _this.renderCount = 0;
    _this.store = props[storeKey] || context[storeKey];
    _this.propsMode = Boolean(props[storeKey]);
    _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);
    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));
    _this.initSelector();
    _this.initSubscription();
    return _this;
}



function wrapWithConnect(WrappedComponent) { // returned by connect() from 'react-redux'
    invariant(
        typeof WrappedComponent == 'function',
        `You must pass a component to the function returned by ` +
        `connect. Instead received ${JSON.stringify(WrappedComponent)}`
    )

    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component'

    const displayName = getDisplayName(wrappedComponentName)

    const selectorFactoryOptions = {
        ...connectOptions,
        getDisplayName,
        methodName,
        renderCountProp,
        shouldHandleStateChanges,
        storeKey,
        withRef,
        displayName,
        wrappedComponentName,
        WrappedComponent
    }

    class Connect extends Component {
        constructor(props, context) {
            super(props, context)

            this.version = version
            this.state = {}
            this.renderCount = 0
            this.store = props[storeKey] || context[storeKey]
            this.propsMode = Boolean(props[storeKey])
            this.setWrappedInstance = this.setWrappedInstance.bind(this)

            invariant(this.store,
                `Could not find "${storeKey}" in either the context or props of ` +
                `"${displayName}". Either wrap the root component in a <Provider>, ` +
                `or explicitly pass "${storeKey}" as a prop to "${displayName}".`
            )

            this.initSelector()
            this.initSubscription()
        }

        getChildContext() {
            // If this component received store from props, its subscription should be transparent
            // to any descendants receiving store+subscription from context; it passes along
            // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
            // Connect to control ordering of notifications to flow top-down.
            const subscription = this.propsMode ? null : this.subscription
            return { [subscriptionKey]: subscription || this.context[subscriptionKey] }
        }

        componentDidMount() {
            if (!shouldHandleStateChanges) return

            // componentWillMount fires during server side rendering, but componentDidMount and
            // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
            // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
            // To handle the case where a child component may have triggered a state change by
            // dispatching an action in its componentWillMount, we have to re-run the select and maybe
            // re-render.
            this.subscription.trySubscribe()
            this.selector.run(this.props)
            if (this.selector.shouldComponentUpdate) this.forceUpdate()
        }

        componentWillReceiveProps(nextProps) {
            this.selector.run(nextProps)
        }

        shouldComponentUpdate() {
            return this.selector.shouldComponentUpdate
        }

        componentWillUnmount() {
            if (this.subscription) this.subscription.tryUnsubscribe()
            this.subscription = null
            this.notifyNestedSubs = noop
            this.store = null
            this.selector.run = noop
            this.selector.shouldComponentUpdate = false
        }

        getWrappedInstance() {
            invariant(withRef,
                `To access the wrapped instance, you need to specify ` +
                `{ withRef: true } in the options argument of the ${methodName}() call.`
            )
            return this.wrappedInstance
        }

        setWrappedInstance(ref) {
            this.wrappedInstance = ref
        }

        initSelector() {
            const sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions)
            this.selector = makeSelectorStateful(sourceSelector, this.store)
            this.selector.run(this.props)
        }

        initSubscription() {
            if (!shouldHandleStateChanges) return

            // parentSub's source should match where store came from: props vs. context. A component
            // connected to the store via props shouldn't use subscription from context, or vice versa.
            const parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey]
            this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this))

            // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
            // the middle of the notification loop, where `this.subscription` will then be null. An
            // extra null check every change can be avoided by copying the method onto `this` and then
            // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
            // listeners logic is changed to not call listeners that have been unsubscribed in the
            // middle of the notification loop.
            this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription)
        }

        onStateChange() {
            this.selector.run(this.props)

            if (!this.selector.shouldComponentUpdate) {
                this.notifyNestedSubs()
            } else {
                this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate
                this.setState(dummyState)
            }
        }

        notifyNestedSubsOnComponentDidUpdate() {
            // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
            // needs to notify nested subs. Once called, it unimplements itself until further state
            // changes occur. Doing it this way vs having a permanent `componentDidMount` that does
            // a boolean check every time avoids an extra method call most of the time, resulting
            // in some perf boost.
            this.componentDidUpdate = undefined
            this.notifyNestedSubs()
        }

        isSubscribed() {
            return Boolean(this.subscription) && this.subscription.isSubscribed()
        }

        addExtraProps(props) {
            if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props
            // make a shallow copy so that fields added don't leak to the original selector.
            // this is especially important for 'ref' since that's a reference back to the component
            // instance. a singleton memoized selector would then be holding a reference to the
            // instance, preventing the instance from being garbage collected, and that would be bad
            const withExtras = { ...props }
            if (withRef) withExtras.ref = this.setWrappedInstance
            if (renderCountProp) withExtras[renderCountProp] = this.renderCount++
            if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription
            return withExtras
        }

        render() {
            const selector = this.selector
            selector.shouldComponentUpdate = false

            if (selector.error) {
                throw selector.error
            } else {
                return createElement(WrappedComponent, this.addExtraProps(selector.props))
            }
        }
    }

    Connect.WrappedComponent = WrappedComponent
    Connect.displayName = displayName
    Connect.childContextTypes = childContextTypes
    Connect.contextTypes = contextTypes
    Connect.propTypes = contextTypes

    if (process.env.NODE_ENV !== 'production') {
        Connect.prototype.componentWillUpdate = function componentWillUpdate() {
            // We are hot reloading!
            if (this.version !== version) {
                this.version = version
                this.initSelector()

                if (this.subscription) this.subscription.tryUnsubscribe()
                this.initSubscription()
                if (shouldHandleStateChanges) this.subscription.trySubscribe()
            }
        }
    }

    return hoistStatics(Connect, WrappedComponent)
}






import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var boolExp = true;

const abc = () => {
    return
    _jsxs("div", {
        children: [_jsx("ijk", {
            lmn: 'hi !'
        }), boolExp && _jsx("mno", {
            uio: 'hello !'
        })]
    });
};





module.exports = {
    devtool: false, // using SourceMapDevToolPlugin instead
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                styles: {
                    test: /\.css$/,
                    name: 'styles',
                    chunks: 'all'
                }
            }
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].map',
                exclude: ['vendor.js']
            })
        ]
    }
}





module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
        ],
    },
    ignoreWarnings: [/Failed to parse source map/],
};






[
    {
        loader: '/home/ankit/Code_Practice/VSCode_Code_Environment/VSCode_Workables/React_Workables/React_Practice_Projects/The Complete React Developer Course_ (w Hooks and Redux)_AndrewMead/React_App_Zone/React_App/expensify-app/node_modules/extract-text-webpack-plugin/dist/loader.js',
        options: { omit: 0, remove: true }
    },
    { loader: 'css-loader' },
    { loader: 'sass-loader' }
]


var a =
{
    filename: 'style.css',
    id: 1,
    options: {}
}







function serveStatic(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        if (fallthrough) {
            return next()
        }

        // method not allowed
        res.statusCode = 405
        res.setHeader('Allow', 'GET, HEAD')
        res.setHeader('Content-Length', '0')
        res.end()
        return
    }

    var forwardError = !fallthrough
    var originalUrl = parseUrl.original(req)
    var path = parseUrl(req).pathname

    // make sure redirect occurs at mount
    if (path === '/' && originalUrl.pathname.substr(-1) !== '/') {
        path = ''
    }

    // create send stream
    var stream = send(req, path, opts)

    // add directory handler
    stream.on('directory', onDirectory)

    // add headers listener
    if (setHeaders) {
        stream.on('headers', setHeaders)
    }

    // add file listener for fallthrough
    if (fallthrough) {
        stream.on('file', function onFile() {
            // once file is determined, always forward error
            forwardError = true
        })
    }

    // forward errors
    stream.on('error', function error(err) {
        if (forwardError || !(err.statusCode < 500)) {
            next(err)
            return
        }

        next()
    })

    // pipe
    stream.pipe(res)
}





var save_Function = function (options, fn) { // variable name 'save_Function' defined by me
    let parallelSave;
    this.$op = 'save';

    if (this.$__.saving) {
        parallelSave = new ParallelSaveError(this);
    } else {
        this.$__.saving = new ParallelSaveError(this);
    }

    if (typeof options === 'function') {
        fn = options;
        options = undefined;
    }

    options = new SaveOptions(options);
    if (options.hasOwnProperty('session')) {
        this.$session(options.session);
    }
    this.$__.$versionError = generateVersionError(this, this.modifiedPaths());

    fn = this.constructor.$handleCallbackError(fn);
    return this.constructor.db.base._promiseOrCallback(fn, cb => {
        cb = this.constructor.$wrapCallback(cb);

        if (parallelSave) {
            this.$__handleReject(parallelSave);
            return cb(parallelSave);
        }

        this.$__.saveOptions = options;

        this.$__save(options, error => {
            this.$__.saving = null;
            this.$__.saveOptions = null;
            this.$__.$versionError = null;
            this.$op = null;

            if (error) {
                this.$__handleReject(error);
                return cb(error);
            }
            cb(null, this);
        });
    }, this.constructor.events);
}