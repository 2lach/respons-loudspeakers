import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import config from '../../../data/SiteConfig';

const propTypes = {
  postNode: PropTypes.shape({
    frontmatter: PropTypes.object,
    excerpt: PropTypes.string,
  }),
  metaData: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
  postNode: null,
  metaData: null,
};

function SEO({ postNode, metaData }) {
  // initial metadata
  let _metaData = {
    title: config.siteTitle,
    description: config.siteDescription,
    keywords: config.siteKeywords,
    image: config.siteUrl + config.siteLogo,
  };

  // override _metadata if node is newspost
  if (postNode) {
    _metaData.title = `${postNode.frontmatter.title}`;
    _metaData.description = postNode.excerpt;
    _metaData.keywords = config.siteKeywords;
    _metaData.image = config.siteUrl + postNode.frontmatter.thumbnail;
  }

  // override _metadata if metadata is set manually
  _metaData = {
    ..._metaData,
    ...metaData,
  };

  // JSON-LD
  const schemaOrgJSONLD = [];

  // JSON-LD Corporation
  schemaOrgJSONLD.push({
    '@context': 'http://schema.org',
    '@type': 'Corporation',
    name: config.corporationName,
    url: config.siteUrl,
    logo: `${config.siteUrl}${config.siteLogo}`,
    address: {
      postalCode: '697-0123',
      addressCountry: 'JP',
      addressRegion: '',
      addressLocality: '',
      streetAddress: '',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+81-70-4398-9424',
        contactType: 'sales',
      },
    ],
    founder: {
      '@type': 'Person',
      givenName: '翔太',
      familyName: '田村',
    },
    foundingDate: '2018-4-11',
    description: config.siteDescription,
    sameAs: ['https://www.facebook.com/responsloudspeaker/'],
  });

  // JSON-LD Breadcrumb
  const breadcrumbItemList = [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': config.siteUrl,
        name: config.corporationName,
        image: config.siteLogo,
      },
    },
  ];

  if (postNode) {
    breadcrumbItemList.push({
      '@type': 'ListItem',
      position: 2,
      item: {
        '@id': `${config.siteUrl}/news/`,
        name: 'news',
      },
    });
  }

  schemaOrgJSONLD.push({
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItemList,
  });

  // JSON-LD newsPosting
  if (postNode) {
    schemaOrgJSONLD.push({
      '@context': 'http://schema.org',
      '@type': 'newsPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${config.siteUrl}/news${postNode.fields.slug}`,
      },
      headline: postNode.frontmatter.title,
      image: [`${config.siteUrl}${postNode.frontmatter.thumbnail}`],
      datePublished: postNode.frontmatter.date,
      dateModified: postNode.frontmatter.dateModified,
      author: {
        '@type': 'Person',
        name: 'Shota Tamura',
      },
      publisher: {
        '@type': 'Organization',
        name: config.corporationName,
        logo: {
          '@type': 'ImageObject',
          url: `${config.siteUrl}/images/logo_for_schema.png`,
        },
      },
      description: postNode.frontmatter.summary,
    });
  }

  return (
    <Helmet
      title={_metaData.title}
      meta={[
        { name: 'description', content: _metaData.description },
        { name: 'keywords', content: _metaData.keywords },
        { name: 'image', content: _metaData.image, property: 'og:image' },
      ]}
      script={[
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(schemaOrgJSONLD),
        },
      ]}
    />
  );
}

SEO.propTypes = propTypes;
SEO.defaultProps = defaultProps;

export default SEO;
