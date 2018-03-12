# [Changelog](http://keepachangelog.com/)
All releases will be documented in this file.

## [1.2.0] 2017-12-08
### Changed
- Upgraded to latest Sendgrid API
- Added Dot templates for emails

## [1.2.0] 2017-12-07
### Added
- Google OAuth 2 authentication scheme
- Removed latent code for Facebook auth
### Changed
- New error handling process implemented
- zxcvbn password validation enforced

## [1.1.1] 2017-11-21
### Changed
- Deploy script now builds new containers before taking down current containers to minimise downtime

## [1.1.0] 2017-11-21
### Added
- Enquiry route for messenger api
- Updated mission API to automatically include client or pilot ID as specified (to be revised)
- Unified notification service
- Mission emails
- New password reset with 6 char / 15 min expiry
- Archived missions route re-added

## [1.0.0] 2017-11-21
### Added
- ZXCVBN password validation
- Standardised error API
- Email checking API
- More robust job checking API

## [0.1.1]
### Added
- Added GET route for archived missions
- Removed user roles from post request

## [0.1.0] 2017-11-14
### Changed
- Prevents users with "requiresPasswordReset" from logging in, automatically sends password reset email

## [0.1.0] 2017-11-13 Initial build

## Format:
## [sem-ver] [Production release date: (yyyy-mm-dd)] [Title (optional)]
### Added
### Changed
### Removed
### Fixed
### Security

# [Semantic versioning](http://semver.org/)

Given a version number MAJOR.MINOR.PATCH, increment the:

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.
