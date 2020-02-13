import { Setting } from './setting';

export class SEO {
    constructor() {}

    //Add schema data
  public static schemaInit(type: 'site' | 'corporation' | 'localBusiness', settings : Setting[]) {
    if (type == 'site')
          return {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            'name' : Setting.getByKey('sitename',settings).value,
            'url' : Setting.getByKey('url',settings).value
          }
    if (type == 'corporation' )      
        return {
            '@context': 'http://schema.org',
            '@type': 'Corporation',
            '@id':  Setting.getByKey('url',settings).value.replace('www','corporation'),
            'description': Setting.getByKey('home',settings).value,
            'url': Setting.getByKey('url',settings).value,
            'address': {
                '@type': "PostalAddress",
                'addressLocality': Setting.getByKey('addressLocality',settings).value,
                'addressCountry':Setting.getByKey('addressCountry',settings).value,
                'postalCode':Setting.getByKey('addressPostal',settings).value,
                'streetAddress':Setting.getByKey('addressStreet',settings).value,
            },
            'logo':Setting.getByKey('appicon512',settings).value,
            'sameAs': [
              Setting.getByKey('facebook',settings).value,
              Setting.getByKey('google',settings).value,
              Setting.getByKey('instagram',settings).value,
              Setting.getByKey('linkedin',settings).value,
              Setting.getByKey('twitter',settings).value,
              Setting.getByKey('youtube',settings).value,
            ].filter(a => a !== "")
          }
    if (type == 'localBusiness')      
        return {
          '@context': 'http://schema.org',
          '@type': 'Organization',
          'url' : Setting.getByKey('url',settings).value,
          'contactPoint': {
             'telephone' : Setting.getByKey('telephone',settings).value,
             'email' : Setting.getByKey('email',settings).value,
             'contactType' : 'customer service'
          }
        }
  }

}