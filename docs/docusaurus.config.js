/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Horn',
  tagline: '🦄 Extendable web-framework with IoC (Inversion of Control) container inside.',
  url: 'https://hornts.github.io/horn',
  baseUrl: '/horn/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'hornts',
  projectName: 'horn',
  themeConfig: {
    navbar: {
      title: 'Horn',
      logo: {
        alt: 'Horn',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/hornts/horn',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} @hornts, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
