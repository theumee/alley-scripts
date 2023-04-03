import React from 'react';
import classnames from 'classnames';

import '../styles/global.scss';

/**
 * Global Styles Decorator
 */
export const WithStyles = (Story: any, context: any) => {
  const externalStyles = [
    // WordPress global admin styles.
    'https://wordpress.org/gutenberg/wp-includes/css/dashicons.min.css',
    'https://wordpress.org/gutenberg/wp-admin/css/common.min.css',
    'https://wordpress.org/gutenberg/wp-admin/css/forms.min.css',

    // Gutenberg Styles.
    'https://wordpress.org/gutenberg/wp-content/plugins/gutenberg/build/block-editor/style.css',
    'https://wordpress.org/gutenberg/wp-content/plugins/gutenberg/build/block-library/style.css',
    'https://wordpress.org/gutenberg/wp-content/plugins/gutenberg/build/components/style.css',
  ];

  // In wp-admin, these classes are added to the body element,
  // which is used as a class scope for some relevant styles in the external
  // stylesheets listed above. We simulate that here by adding the classes to a wrapper element.
  const classes = ['wp-admin', 'wp-core-ui'];

  return (
    <div className={classnames(classes)}>
      {externalStyles.map((stylesheet) => (
        <link key={stylesheet} rel="stylesheet" href={stylesheet} />
      ))}

      <Story {...context} />
    </div>
  );
};