class ExtractTextPlugin {
    constructor(options) {
        if (isString(options)) {
            options = { filename: options };
        } else {
            validateOptions(path.resolve(__dirname, '../schema/plugin.json'), options, 'Extract Text Plugin');
        }
        this.filename = options.filename;
        this.id = options.id != null ? options.id : ++nextId;
        this.options = {};
        mergeOptions(this.options, options);
        delete this.options.filename;
        delete this.options.id;
    }

    static loader(options) {
        return { loader: require.resolve('./loader'), options };
    }

    applyAdditionalInformation(source, info) {
        if (info) {
            return new ConcatSource(
                `@media ${info[0]} {`,
                source,
                '}',
            );
        }
        return source;
    }

    loader(options) {
        return ExtractTextPlugin.loader(mergeOptions({ id: this.id }, options));
    }

    mergeNonInitialChunks(chunk, intoChunk, checkedChunks) {
        if (!intoChunk) {
            checkedChunks = [];
            chunk.chunks.forEach((c) => {
                if (isInitialOrHasNoParents(c)) return;
                this.mergeNonInitialChunks(c, chunk, checkedChunks);
            }, this);
        } else if (checkedChunks.indexOf(chunk) < 0) {
            checkedChunks.push(chunk);
            chunk.forEachModule((module) => {
                intoChunk.addModule(module);
                module.addChunk(intoChunk);
            });
            chunk.chunks.forEach((c) => {
                if (isInitialOrHasNoParents(c)) return;
                this.mergeNonInitialChunks(c, intoChunk, checkedChunks);
            }, this);
        }
    }

    renderExtractedChunk(chunk) {
        const source = new ConcatSource();
        chunk.forEachModule((module) => {
            const moduleSource = module.source();
            source.add(this.applyAdditionalInformation(moduleSource, module.additionalInformation));
        }, this);
        return source;
    }

    extract(options) {
        if (Array.isArray(options) || isString(options) || typeof options.options === 'object' || typeof options.query === 'object') {
            options = { use: options };
        } else {
            validateOptions(path.resolve(__dirname, '../schema/loader.json'), options, 'Extract Text Plugin (Loader)');
        }
        let loader = options.use;
        let before = options.fallback || [];
        if (isString(loader)) {
            loader = loader.split('!');
        }
        if (isString(before)) {
            before = before.split('!');
        } else if (!Array.isArray(before)) {
            before = [before];
        }
        options = mergeOptions({ omit: before.length, remove: true }, options);
        delete options.use;
        delete options.fallback;
        return [this.loader(options)]
            .concat(before, loader)
            .map(getLoaderObject);
    }

    apply(compiler) {
        const options = this.options;
        compiler.plugin('this-compilation', (compilation) => {
            const extractCompilation = new ExtractTextPluginCompilation();
            compilation.plugin('normal-module-loader', (loaderContext, module) => {
                loaderContext[NS] = (content, opt) => {
                    if (options.disable) { return false; }
                    if (!Array.isArray(content) && content != null) { throw new Error(`Exported value was not extracted as an array: ${JSON.stringify(content)}`); }
                    module[NS] = {
                        content,
                        options: opt || {},
                    };
                    return options.allChunks || module[`${NS}/extract`]; // eslint-disable-line no-path-concat
                };
            });
            const filename = this.filename;
            const id = this.id;
            let extractedChunks;
            compilation.plugin('optimize-tree', (chunks, modules, callback) => {
                extractedChunks = chunks.map(() => new Chunk());
                chunks.forEach((chunk, i) => {
                    const extractedChunk = extractedChunks[i];
                    extractedChunk.index = i;
                    extractedChunk.originalChunk = chunk;
                    extractedChunk.name = chunk.name;
                    extractedChunk.entrypoints = chunk.entrypoints;
                    chunk.chunks.forEach((c) => {
                        extractedChunk.addChunk(extractedChunks[chunks.indexOf(c)]);
                    });
                    chunk.parents.forEach((c) => {
                        extractedChunk.addParent(extractedChunks[chunks.indexOf(c)]);
                    });
                });
                async.forEach(chunks, (chunk, callback) => { // eslint-disable-line no-shadow
                    const extractedChunk = extractedChunks[chunks.indexOf(chunk)];
                    const shouldExtract = !!options.allChunks;
                    chunk.sortModules();
                    async.forEach(chunk.mapModules(c => c), (module, callback) => { // eslint-disable-line no-shadow
                        let meta = module[NS];
                        if (meta && (!meta.options.id || meta.options.id === id)) {
                            const wasExtracted = Array.isArray(meta.content);
                            // A stricter `shouldExtract !== wasExtracted` check to guard against cases where a previously extracted
                            // module would be extracted twice. Happens when a module is a dependency of an initial and a non-initial
                            // chunk. See issue #604

                            // check every module's chunks.parents() to decide extract or not
                            for (let i = 0; i < module.chunks.length; i++) {
                                if (!isInitialOrHasNoParents(module.chunks[i]) && !module.extracted) {
                                    module.extracted = true;
                                    break;
                                }
                            }
                            if (shouldExtract || (!module.extracted && !wasExtracted)) {
                                module[`${NS}/extract`] = true; // eslint-disable-line no-path-concat
                                compilation.rebuildModule(module, (err) => {
                                    if (err) {
                                        compilation.errors.push(err);
                                        return callback();
                                    }
                                    meta = module[NS];
                                    // Error out if content is not an array and is not null
                                    if (!Array.isArray(meta.content) && meta.content != null) {
                                        err = new Error(`${module.identifier()} doesn't export content`);
                                        compilation.errors.push(err);
                                        return callback();
                                    }
                                    if (meta.content) { extractCompilation.addResultToChunk(module.identifier(), meta.content, module, extractedChunk); }
                                    callback();
                                });
                            } else {
                                if (meta.content) { extractCompilation.addResultToChunk(module.identifier(), meta.content, module, extractedChunk); }
                                callback();
                            }
                        } else callback();
                    }, (err) => {
                        if (err) return callback(err);
                        callback();
                    });
                }, (err) => {
                    if (err) return callback(err);
                    extractedChunks.forEach((extractedChunk) => {
                        if (isInitialOrHasNoParents(extractedChunk)) { this.mergeNonInitialChunks(extractedChunk); }
                    }, this);
                    extractedChunks.forEach((extractedChunk) => {
                        if (!isInitialOrHasNoParents(extractedChunk)) {
                            extractedChunk.forEachModule((module) => {
                                extractedChunk.removeModule(module);
                            });
                        }
                    });
                    compilation.applyPlugins('optimize-extracted-chunks', extractedChunks);
                    callback();
                });
            });
            compilation.plugin('additional-assets', (callback) => {
                extractedChunks.forEach((extractedChunk) => {
                    if (extractedChunk.getNumberOfModules()) {
                        extractedChunk.sortModules((a, b) => {
                            if (!options.ignoreOrder && isInvalidOrder(a, b)) {
                                compilation.errors.push(new OrderUndefinedError(a.getOriginalModule()));
                                compilation.errors.push(new OrderUndefinedError(b.getOriginalModule()));
                            }
                            return getOrder(a, b);
                        });
                        const chunk = extractedChunk.originalChunk;
                        const source = this.renderExtractedChunk(extractedChunk);

                        const getPath = format => compilation.getPath(format, {
                            chunk,
                        }).replace(/\[(?:(\w+):)?contenthash(?::([a-z]+\d*))?(?::(\d+))?\]/ig, function () { // eslint-disable-line func-names
                            return loaderUtils.getHashDigest(source.source(), arguments[1], arguments[2], parseInt(arguments[3], 10));
                        });

                        const file = (isFunction(filename)) ? filename(getPath) : getPath(filename);

                        compilation.assets[file] = source;
                        chunk.files.push(file);
                    }
                }, this);
                callback();
            });
        });
    }
}


ExtractTextPlugin.extract = ExtractTextPlugin.prototype.extract.bind(ExtractTextPlugin);



const pluginObject = new ExtractTextWebpackPlugin('style.css');

// console.log('ExtractTextWebpackPlugin_extract() : ', ExtractTextWebpackPlugin.extract({ use: ['css-loader', 'sass-loader'] }));
// console.log('ExtractTextWebpackPlugin_new ExtractTextWebpackPlugin() : ', new ExtractTextWebpackPlugin('style.css'));

// console.log('ExtractTextWebpackPlugin_extract() : ', pluginObject.extract({ use: ['css-loader', 'sass-loader'] }));
console.log('pluginObject : ', pluginObject);



const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const ETW_Instance = new ExtractTextWebpackPlugin('style.css');
const ETWInstance_Extract = ETW_Instance.extract({
    use: [
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }
    ]
});

// Output of above code starting at line no. 228
// ETWInstance_Extract: [
//     {
//         loader: '/home/ankit/Code_Practice/VSCode_Code_Environment/VSCode_Workables/React_Workables/React_Practice_Projects/The_Complete_React_Developer_Course_wHooks_and_Redux_AndrewMead/React_AM_App_Zone/React_App/expensify-app/node_modules/extract-text-webpack-plugin/dist/loader.js',
//         options: { id: 1, omit: 0, remove: true }
//     },
//     { loader: 'css-loader', options: { sourceMap: true } },
//     { loader: 'sass-loader', options: { sourceMap: true } }
// ]

// ETW_Instance:  ExtractTextPlugin { filename: 'style.css', id: 1, options: {} }















var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;


function useState(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
}

var abc = {
    useState: function (initialState) {
        currentHookNameInDev = 'useState';
        mountHookTypesDev();
        var prevDispatcher = ReactCurrentDispatcher$1.current;
        ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnMountInDEV;

        try {
            return mountState(initialState);
        } finally {
            ReactCurrentDispatcher$1.current = prevDispatcher;
        }
    }
}






var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {

            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;

            if ("value" in descriptor)
                descriptor.writable = true;

            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);

        if (staticProps)
            defineProperties(Constructor, staticProps);

        return Constructor;
    };
}();




// react-router 5.2.0 'Route.js' terenary to if else conversion
if (props.match) {
    if (children) {
        if (typeof children === "function") {
            if (__DEV__) {
                evalChildrenDev(children, props, this.props.path)
            } else {
                children(props)
            }
        } else {
            children
        }
    } else {
        if (component) {
            React.createElement(component, props)
        } else {
            if (render) {
                render(props)
            } else {
                null
            }
        }
    }
} else {
    if (typeof children === "function") {
        if (__DEV__) {
            evalChildrenDev(children, props, this.props.path)
        } else {
            children(props)
        }
    } else {
        null
    }
}