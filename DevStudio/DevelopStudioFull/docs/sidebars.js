// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Docs',
      link: {
        type: 'doc',
        id: 'overview',
      },
      collapsible: false,
      items: [
        'why',
        'getting-started',
        {
          type: 'category',
          label: 'Features',
          link: {
            type: 'doc',
            id: 'features/index',
          },
          items: [
            'features/projects',
            'features/templates',
            'features/css',
            'features/result',
            'features/external-resources',
            'features/tools-pane',
            'features/console',
            'features/compiled-code',
            'features/tests',
            'features/module-resolution',
            'features/intellisense',
            'features/ai',
            'features/code-format',
            'features/keyboard-shortcuts',
            'features/user-settings',
            'features/editor-settings',
            'features/default-template-language',
            'features/assets',
            'features/snippets',
            'features/import',
            'features/export',
            'features/share',
            'features/welcome',
            'features/recover',
            'features/display-modes',
            'features/default-view',
            'features/themes',
            'features/mobile',
            'features/embeds',
            'features/lite',
            'features/read-only',
            'features/permanent-url',
            'features/code-prefill',
            'features/data-urls',
            'features/deploy',
            'features/sync',
            'features/broadcast',
            'features/backup-restore',
            'features/github-integration',
            'features/integrations',
            'features/user-management',
            'features/security',
            'features/self-hosting',
          ],
        },
        {
          type: 'category',
          label: 'Configuration',
          link: {
            type: 'doc',
            id: 'configuration/index',
          },
          items: ['configuration/configuration-object', 'configuration/query-params'],
        },
        {
          type: 'category',
          label: 'SDK',
          link: {
            type: 'doc',
            id: 'sdk/index',
          },
          items: ['sdk/js-ts', 'sdk/react', 'sdk/vue', 'sdk/svelte', 'sdk/headless'],
        },
        {
          type: 'category',
          label: 'Advanced',
          link: {
            type: 'doc',
            id: 'advanced/index',
          },
          items: ['advanced/custom-settings', 'advanced/services'],
        },
        {
          type: 'category',
          label: 'Languages',
          link: {
            type: 'doc',
            id: 'languages/index',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'languages',
            },
          ],
        },
        'bookmarklet',
        'gh-action',
        'contribution',
        'credits',
        'license',
        'sponsor',
        'contact',
        'about',
      ],
    },
  ],

  examplesSidebar: [
    {
      type: 'category',
      label: 'Display Modes',
      link: {
        type: 'doc',
        id: 'examples/display-modes/index',
      },
      items: [
        'examples/display-modes/full',
        'examples/display-modes/editor',
        'examples/display-modes/codeblock',
        'examples/display-modes/result',
      ],
    },
  ],
};

module.exports = sidebars;