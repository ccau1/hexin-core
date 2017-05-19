# HEXIN Framework Core Library
A list of core libraries for the HEXIN node framework


Table of contents
=================

  * [AppStart](#appstart)
    * [AppStartBase](#appstartbase)
    * [AppStartConfig](#appstartconfig)
  * [Controller](#controller)
    * [ControllerBase](#controllerbase)
    * [ControllerCrudBase](#controllercrudbase)
  * [Service](#service)
    * [ServiceBase](#servicebase)
    * [ServiceCrudBase](#servicecrudbase)
  * [Helper](#helper)
    * [Plop](#plop)
    * [Database](#database)
    * [BrainTree](#braintree)
    * [FiveBeans](#fivebeans)
    * [HandleError](#handleerror)
    * [Locale](#locale)
    * [Logger](#logger)
    * [Redis](#redis)
    * [Request](#request)
    * [Token](#token)

## AppStart
### AppStartBase
`super(appConfig: Object)` - pass appConfig into constructor
`getBaseConfig()` - Function that returns base config set by AppStart
`setConfig(appConfig: Object)` - Function that allows modification to appConfig before any handlers are called
```javascript
setConfig(appConfig) {
    //    port
    appConfig.port = process.env.PORT || 8280;
    //    title of the app
    appConfig.title = 'WTT API';
    //    base URL for all routes (ex. /api)
    appConfig.baseUrl = '/api';
}
```
`setHandlers(appConfig: Object)` - (Must Override) Function where all handles are declared
```javascript
setHandlers(appConfig) {
    this.handle(new Auth(appConfig));
    this.handle(new Controllers(appConfig));
}
```
`handle(handle: , addToBeginning: boolean = false)` - declare a handle to call during build phrase
```javascript
this.handle(new Controllers(appConfig));
```

### AppStartConfig
AppStartConfig provides the basic lifecycle of the build phase in an app_start

`preInit()` - defines configurations before server starts.
`init()` - defines configurations during server start.
`postInit()` - defines configurations after server starts.

## Controller
### ControllerBase
This class provides methods to handle routes

`constructor(app: Object)` - app holds the router that represents `api/`.
`super(app[, controllerName[, service]])`
- app - app holds the router that represents `api/`.
- controllerName - route url path `api/{route}/`.
- service - service that manage majority of the data manipulation and persistence.

`this.a` - Router that handles `api/`.
`this.r` - Router that handles `api/{controllerName}/` (same as renderRoute's router argument).
`this.controllerName` - Variable that represents the controller name in the url path.
`this.m` - Service that was passed into the constructor.

`renderRoute(router: Object): void` - Developers will use this method to declare all their routes using the `router` object passed into the argument. all routes using `router.{verb}({path}, ...` will fall under `api/{controllerName}/{path}`
```javascript
router.post('/', (req, res, next) {
```
`authenticate` - Middleware that checks if user is logged in
```javascript
router.post('/', this.authenticate, (req, res, next)
```
`authorize(...roles: Array<string>)` - Middleware that checks if user consists any of the listed roles
```javascript
router.post('/', this.authorize, (req, res, next) {
router.post('/', this.authorize(), (req, res, next) { (same as above)
router.post('/', this.authorize('user', 'admin'), (req, res, next) {
```

`this.isVerb(verb: string, inVerbList: Array<string>|string): boolean` - Function that returns true if first arg is in second argument. Useful for checking if req.method is equal to one of the verbs listed
```javascript
this.isVerb(req.method, 'PUT|POST|DELETE')
this.isVerb(req.method, ['PUT', 'POST', 'DELETE'])
```

### ControllerCrudBase
This class extends the ControllerBase and handles the basic CRUD methods based on the Service passed into the constructor

`constructor(app: Object)` - app holds the router that represents `api/`.
`super(app[, controllerName[, service[, middlewares]]])`
- app - app holds the router that represents `api/`
- controllerName - route url path `api/{route}/`
- service - service that manage majority of the data manipulation and persistence
- middlewares - list of middleware that governs all ControllerCrudBase calls
```javascript
  constructor(app) {
    const baseMiddlewares = [
        (req, res, next) => {
            if (this.isVerb(req.method, 'PUT|POST|DELETE')) {
                this.authenticate(req, res, next);
            } else {
                next();
            }
        }
    ];
    super(app, 'auth', AuthService, baseMiddlewares);
  }
```
ControllerCrudBase automatically provides the following routes:
- **[GET]** `api/{route}/` - Get All
- **[GET]** `api/{route}/:_id` - Get by _id
- **[POST]** `api/{route}/` - Create
- **[PUT]** `api/{route}/:_id` - Update by _id
- **[DELETE]** `api/{route}/:_id` - Delete by _id

## Service
### ServiceBase
This class provides the basic fields and method required for data manipulation, as well as the current scope of the request

Scope-based variables and methods
`this.t(localeKey: string, args: Array<string>): string` - Function for translating key into current locale
`this.lang` - Variable that displays current locale
`this.context` - The req from route(req, res, next)
`this._model` - The Model injected in the constructor

Data manipulation helpers
`validate(obj: Object): void` - Function that validates the object using indicative. Returns void but throws if invalid validation
`sanitize(obj: Object): Object` - Function that sanitize the object using indicative. Returns mutated obj
`mapper(obj: Object): Object` - Function that changes database object to public view object (DTO)
`mapperReverse(obj: Object): Object` - Function that changes public view object to database object (DTO)

### ServiceCrudBase
This class extends the ServiceBase and handles the basic CRUD methods based on the Model passed into the constructor

`create(obj: Object): Object` - Function that creates new data entry.
`getAll(): Array<Object>` - Function that returns all entries.
`getById(_id): Object` - Function that returns entry by _id
`update(_id, obj): Object` - Function that updates entry by _id
`delete(_id): Object` - Function that delete entry by _id

## Helpers

### Plop
(Documentation coming soon)
### Database
(Documentation coming soon)
### BrainTree
(Documentation coming soon)
### FiveBeans
(Documentation coming soon)
### HandleError
(Documentation coming soon)
### Locale
(Documentation coming soon)
### Logger
(Documentation coming soon)
### Redis
(Documentation coming soon)
### Request
(Documentation coming soon)
### Token
(Documentation coming soon)
