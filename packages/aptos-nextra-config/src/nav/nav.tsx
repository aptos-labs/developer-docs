// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

type Page = {
  title: string;
  type: 'page';
  display?: 'hidden';
  href?: string;
  newWindow?: boolean;
  theme?: {
    layout?: 'full';
    sidebar?: boolean;
    toc?: boolean;
    breadcrumb?: boolean;
    typesetting?: 'article';
  };
};

type Menu = {
  title: string;
  type: 'menu';
  items: {
    [key: string]: {
      title: string;
      href?: string;
      newWindow?: boolean;
    };
  };
};

type ConfigItem = Page | Menu;

type Config = {
  [key: string]: ConfigItem;
};

export enum NavigationHeaderCategories {
  BUILD = 'build',
  DEVELOPER_PLATFORMS = 'developer_platforms',
  NETWORK = 'network'
}

export const defaultNav: Config = {
  build: {
    items: [
      {
        title: 'Typescript SDK',
        subtitle: 'Build web applications',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
        link: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
      },
      {
        title: 'Typescript SDK',
        subtitle: 'Build web applications',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
        link: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
      },
      {
        title: 'Typescript SDK',
        subtitle: 'Build web applications',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
        iconSvg: <div>hi</div>,
        link: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
      },
      {
        title: 'Typescript SDK',
        subtitle: 'Build web applications',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
        link: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
      }
    ]
  },
}
