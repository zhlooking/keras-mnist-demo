const key = process.env.DEPLOY_ENV

const sentryPublicDSN = {
  dev: '',
  test: 'http://be07c58934d84eccbd25f7c30f6e626e@115.159.117.60:9000/9',
}

const sentryBaseURL = 'http://115.159.117.60:9000/api/0'
const sentryAPIKey = '4352c034cecd41e1bb2454494f3fee2f82788eec9b444fc78b0ad9ffb8ef9e93'

const sentryOrganization = {
  dev: 'sentry',
  test: 'sentry',
}

const sentryProject = {
  dev: 'sentry_demo_test',
  test: 'sentry_demo_test',
}

const environment = key
const VERSION = '1.0.5'

module.exports = {
  DEPLOYKEY: key,
  ENVIRONMENT: environment,
  VERSION,

  SENTRYBASEURL: sentryBaseURL,
  SENTRYDSN: sentryPublicDSN[key],
  SENTRYAPIKEY: sentryAPIKey,
  SENTRYPROJECT: sentryProject[key],
  SENTRYORGANIZATION: sentryOrganization[key],
}
