# API Changelog

## [0.6.0] 2018-05-06 Improved company integration
- [Added] permid.org API service
- [Improved] company integration service
- [Added] Company and news article linker
- [Improved] Async flows in searcher and sourcer modules

## [0.5.3] 2018-04-17 Error handling improvements & Changelog restructure.
- [Improved] API errors by including warning for search route (displays unset parameters).
- [Added] Advanced logging feature, where we save error messages in production mode.
- [Fixed] Authentication create user, invalid login error. Token now returned on user sign in.

## [0.4.1] 2018-04-17 NYT Integration & Documentation Improvement
- [Added] New York Times as an additional news source.
- [Added] Documentation of python module to website.
- [Improved] Python module to include user auth.

## [0.3.1] 2018-03-28 API Restructure
- [Removed] Company route, because it didn't address any core features.
- [Added] Time attribute to search route.
- [Improved] Search results organisation service.
- [Improved] Authentication, but checking if the current user has read permissions for certain routes.
- [Improved] Documentation, by adding extra search parameters to docs (ie. start & end time, topics & keywords).

## [0.2.1] 2018-03-26 Adding Documentation Skeleton
- [Improved] Search service, by enabling dynamic source integration.
- [Added] Guardian news source to the search service.

## [0.1.1] 2018-03-14 Adding Documentation Skeleton
- [Added] README.md. Initialised README doc with basic setup instructions and commands.
- [Added] CONTRIBUTING.md. Initialised CONTRIBUTING doc with basic instructions on how to contribute to the doc.
- [Added] CHANGELOG.md. Initialised CHANGELOG doc with versioning semantics etc.

## [0.1.0] 2018-03-13 Initial build
- [Added] YO generated template boilerplate, created a basic boilerplate, containing the api routes and services.
- [Added] Utils, set up a utils modules for helper functions etc.
- [Security] enabled when creating users. Users can't change their role to admin (only admins can update the user role).
